import fs from "node:fs";
import path from "node:path";

// ============================================================================
// TypeScript Interface for Validated Bot Configuration
// ============================================================================

export interface BotConfig {
  TELEGRAM_BOT_TOKEN: string;
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
  ADMIN_TELEGRAM_ID: string;
  ADMIN_TELEGRAM_NUMERIC_ID: number;
}

export interface ValidationError {
  key: keyof BotConfig | string;
  value: string | undefined;
  reason: string;
}

// ============================================================================
// Lightweight .env Loader (Zero-dependency fallback for standalone scripts)
// ============================================================================

function tryLoadEnvFile(): void {
  if (typeof (process as any).loadEnvFile === "function") {
    try {
      (process as any).loadEnvFile(".env");
      return;
    } catch {
      try {
        (process as any).loadEnvFile(".env.local");
        return;
      } catch {
        // Fall through to manual parser
      }
    }
  }

  const candidateFiles = [
    path.resolve(process.cwd(), ".env.local"),
    path.resolve(process.cwd(), ".env"),
  ];

  for (const filePath of candidateFiles) {
    if (fs.existsSync(filePath)) {
      try {
        const content = fs.readFileSync(filePath, "utf8");
        const lines = content.split(/\r?\n/);
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith("#")) continue;
          const match = trimmed.match(/^([A-Za-z0-9_]+)\s*=\s*(?:["']?)(.*?)(?:["']?)$/);
          if (match) {
            const [, key, val] = match;
            if (process.env[key] === undefined) {
              process.env[key] = val;
            }
          }
        }
      } catch {
        // Ignore read errors
      }
    }
  }
}

// ============================================================================
// Validation Guard Implementation
// ============================================================================

/**
 * Validates runtime environment variables against the required schema.
 * If exitOnError is true (default), prints a diagnostic error banner and calls process.exit(1).
 */
export function validateEnvironment(
  envSource: Record<string, string | undefined> = process.env,
  exitOnError: boolean = true
): BotConfig {
  const errors: ValidationError[] = [];

  const rawToken = envSource.TELEGRAM_BOT_TOKEN?.trim();
  const rawSupabaseUrl = (envSource.SUPABASE_URL || envSource.NEXT_PUBLIC_SUPABASE_URL)?.trim();
  const rawSupabaseKey = (
    envSource.SUPABASE_ANON_KEY ||
    envSource.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    envSource.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  )?.trim();
  const rawAdminId = envSource.ADMIN_TELEGRAM_ID?.trim();

  // 1. Validate TELEGRAM_BOT_TOKEN: must not be empty and match <digits>:<string>
  const botTokenRegex = /^\d+:[A-Za-z0-9_-]+$/;
  if (!rawToken) {
    errors.push({
      key: "TELEGRAM_BOT_TOKEN",
      value: rawToken,
      reason: "Variable is missing or empty. Required format: '<digits>:<string>'.",
    });
  } else if (!botTokenRegex.test(rawToken)) {
    errors.push({
      key: "TELEGRAM_BOT_TOKEN",
      value: rawToken.substring(0, 10) + "...",
      reason: "Invalid Telegram token format. Expected '<digits>:<string>' (e.g., 8631409156:AAHIXJjcoTV9csYoXwu_Px2XnmNIZIvv60g).",
    });
  }

  // 2. Validate SUPABASE_URL: must be a valid URL starting with https://
  if (!rawSupabaseUrl) {
    errors.push({
      key: "SUPABASE_URL",
      value: rawSupabaseUrl,
      reason: "Variable is missing or empty. Must be a valid HTTPS URL (e.g. 'https://xyz.supabase.co').",
    });
  } else if (!rawSupabaseUrl.startsWith("https://")) {
    errors.push({
      key: "SUPABASE_URL",
      value: rawSupabaseUrl,
      reason: "URL must start with secure protocol 'https://'.",
    });
  } else {
    try {
      new URL(rawSupabaseUrl);
    } catch {
      errors.push({
        key: "SUPABASE_URL",
        value: rawSupabaseUrl,
        reason: "String is not a well-formed RFC URL.",
      });
    }
  }

  // 3. Validate SUPABASE_ANON_KEY: must not be empty
  if (!rawSupabaseKey) {
    errors.push({
      key: "SUPABASE_ANON_KEY",
      value: rawSupabaseKey,
      reason: "Variable is missing or empty. Provide the Supabase anon/public API key.",
    });
  }

  // 4. Validate ADMIN_TELEGRAM_ID: must be a numeric string or integer
  const numericRegex = /^\d+$/;
  if (!rawAdminId) {
    errors.push({
      key: "ADMIN_TELEGRAM_ID",
      value: rawAdminId,
      reason: "Variable is missing or empty. Provide your numeric Telegram User ID.",
    });
  } else if (!numericRegex.test(rawAdminId)) {
    errors.push({
      key: "ADMIN_TELEGRAM_ID",
      value: rawAdminId,
      reason: "Must be a numeric string or integer (e.g. '123456789').",
    });
  }

  // If validation failed, report errors and terminate process
  if (errors.length > 0) {
    if (exitOnError) {
      console.error("\n" + "=".repeat(78));
      console.error("❌ CRITICAL ENVIRONMENT CONFIGURATION ERROR — STARTUP ABORTED");
      console.error("=".repeat(78));
      console.error(`Found ${errors.length} misconfigured or missing environment variable(s):\n`);

      errors.forEach((err, idx) => {
        console.error(`  [${idx + 1}] Key:    ${err.key}`);
        console.error(`      Value:  ${err.value !== undefined ? `"${err.value}"` : "(undefined)"}`);
        console.error(`      Issue:  ${err.reason}`);
        console.error("-".repeat(78));
      });

      console.error("👉 Please update your .env or .env.local file with valid credentials.");
      console.error("   Refer to .env.example for required schemas and formatting rules.");
      console.error("=".repeat(78) + "\n");

      process.exit(1);
    } else {
      throw new Error(
        `Environment validation failed: ${errors.map((e) => `${e.key}: ${e.reason}`).join("; ")}`
      );
    }
  }

  return {
    TELEGRAM_BOT_TOKEN: rawToken!,
    SUPABASE_URL: rawSupabaseUrl!,
    SUPABASE_ANON_KEY: rawSupabaseKey!,
    ADMIN_TELEGRAM_ID: rawAdminId!,
    ADMIN_TELEGRAM_NUMERIC_ID: parseInt(rawAdminId!, 10),
  };
}

// ============================================================================
// Startup Execution & Export
// ============================================================================

tryLoadEnvFile();

let cachedConfig: BotConfig | null = null;

export function getBotConfig(): BotConfig {
  if (!cachedConfig) {
    cachedConfig = validateEnvironment(process.env, true);
  }
  return cachedConfig;
}

export const config: BotConfig = new Proxy({} as BotConfig, {
  get(_target, prop: string) {
    return (getBotConfig() as any)[prop];
  },
});

export default config;
