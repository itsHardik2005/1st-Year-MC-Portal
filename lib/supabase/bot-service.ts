import { createClient, SupabaseClient } from "@supabase/supabase-js";

// ============================================================================
// Types
// ============================================================================

export type BotTicketType = "signup_issue" | "material_issue" | "feedback";

export interface BotTicketInput {
  userId: string; // Telegram user ID (e.g. '592819281')
  username?: string; // Telegram @username or display name
  type: BotTicketType;
  message: string;
}

export interface BotTicketRecord {
  id: number;
  user_id: string;
  username: string | null;
  type: BotTicketType;
  message: string;
  created_at: string;
}

export type MaterialCategory =
  | "core"
  | "non_core"
  | "non-core"
  | "temp_vault"
  | "temp_pdf"
  | "lecture";

export interface MaterialRecord {
  id: string;
  title: string;
  description: string | null;
  category: MaterialCategory;
  file_url: string | null;
  storage_path: string | null;
  created_at: string;
}

// ============================================================================
// Client Factory
// ============================================================================

/**
 * Creates a public anonymous Supabase client configured for the Telegram bot.
 * Uses the anon/publishable key to interact with RLS-governed tables.
 */
export function getBotSupabaseClient(
  customUrl?: string,
  customAnonKey?: string
): SupabaseClient {
  const url =
    customUrl ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    "https://example.supabase.co";

  const anonKey =
    customAnonKey ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    "anon-key";

  return createClient(url, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

// ============================================================================
// Bot Service Functions
// ============================================================================

/**
 * 1. Submit a user ticket/report/feedback from Telegram into 'bot_tickets' table.
 * Operates via public anon client utilizing the RLS INSERT policy:
 * "with check (true)"
 */
export async function submitBotTicket(
  ticket: BotTicketInput,
  client?: SupabaseClient
): Promise<{ success: boolean; data?: BotTicketRecord; error?: string }> {
  const supabase = client || getBotSupabaseClient();

  const { data, error } = await supabase
    .from("bot_tickets")
    .insert([
      {
        user_id: ticket.userId,
        username: ticket.username || null,
        type: ticket.type,
        message: ticket.message,
      },
    ])
    .select()
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data: data as BotTicketRecord };
}

/**
 * 2. Search academic study materials from the 'materials' table.
 * Uses PostgreSQL full-text search index (to_tsvector('english', title))
 * with fallback to ILIKE for partial fuzzy matches.
 */
export async function searchMaterials(
  keyword: string,
  options?: {
    category?: MaterialCategory;
    limit?: number;
  },
  client?: SupabaseClient
): Promise<{ success: boolean; data?: MaterialRecord[]; error?: string }> {
  const supabase = client || getBotSupabaseClient();
  const limit = options?.limit || 10;

  // Build base query
  let query = supabase
    .from("materials")
    .select("id, title, description, category, file_url, storage_path, created_at")
    .limit(limit);

  // Apply optional category filter
  if (options?.category) {
    query = query.eq("category", options.category);
  }

  const cleanKeyword = keyword.trim();

  if (cleanKeyword) {
    // 1st attempt: GIN Full-Text Search via Postgres to_tsvector websearch
    const { data: ftsData, error: ftsError } = await query.textSearch(
      "title",
      cleanKeyword,
      {
        type: "websearch",
        config: "english",
      }
    );

    if (!ftsError && ftsData && ftsData.length > 0) {
      return { success: true, data: ftsData as MaterialRecord[] };
    }

    // 2nd attempt / fallback: Case-insensitive substring match (ILIKE)
    let fallbackQuery = supabase
      .from("materials")
      .select("id, title, description, category, file_url, storage_path, created_at")
      .ilike("title", `%${cleanKeyword}%`)
      .limit(limit);

    if (options?.category) {
      fallbackQuery = fallbackQuery.eq("category", options.category);
    }

    const { data: ilikeData, error: ilikeError } = await fallbackQuery;

    if (ilikeError) {
      return { success: false, error: ilikeError.message };
    }

    return { success: true, data: (ilikeData || []) as MaterialRecord[] };
  }

  // If keyword is empty, return latest materials
  const { data, error } = await query.order("created_at", { ascending: false });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data: (data || []) as MaterialRecord[] };
}

/**
 * 3. Fetch materials by category (e.g. 'core', 'non_core', 'temp_vault')
 */
export async function getMaterialsByCategory(
  category: MaterialCategory,
  limit: number = 20,
  client?: SupabaseClient
): Promise<{ success: boolean; data?: MaterialRecord[]; error?: string }> {
  const supabase = client || getBotSupabaseClient();

  const { data, error } = await supabase
    .from("materials")
    .select("id, title, description, category, file_url, storage_path, created_at")
    .eq("category", category)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data: (data || []) as MaterialRecord[] };
}

// ============================================================================
// Verification Runner
// ============================================================================

/**
 * Verification test function: executes queries against both tables using anon key
 */
export async function verifyBotDatabaseIntegration(client?: SupabaseClient): Promise<{
  ticketInsertTest: { passed: boolean; details: any };
  materialQueryTest: { passed: boolean; details: any };
}> {
  const supabase = client || getBotSupabaseClient();

  // Test 1: Insert ticket
  console.log("--> Testing anon INSERT into 'bot_tickets'...");
  const ticketRes = await submitBotTicket(
    {
      userId: "test_telegram_12345",
      username: "test_bot_user",
      type: "feedback",
      message: "Automated verification test ticket from Supabase Bot Service.",
    },
    supabase
  );

  // Test 2: Query materials
  console.log("--> Testing anon SELECT from 'materials' with search...");
  const materialRes = await searchMaterials("Mathematics", { limit: 5 }, supabase);

  return {
    ticketInsertTest: {
      passed: ticketRes.success,
      details: ticketRes.data || ticketRes.error,
    },
    materialQueryTest: {
      passed: materialRes.success,
      details: materialRes.data || materialRes.error,
    },
  };
}
