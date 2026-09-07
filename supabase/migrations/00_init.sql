-- ============================================================================
-- Supabase Database Migration & RLS Security Script
-- File: supabase/migrations/00_init.sql
-- ============================================================================

-- 1. Create custom extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create 'profiles' table linking to auth.users
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'admin')),
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Create 'users' table alias view / table for backward compatibility
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'admin')),
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. Create 'materials' table
CREATE TABLE IF NOT EXISTS public.materials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('core', 'non-core', 'lecture', 'temp_pdf')),
  file_url TEXT,
  storage_path TEXT,
  video_id TEXT, -- Unlisted YouTube video ID if category is 'lecture'
  is_temp BOOLEAN NOT NULL DEFAULT false,
  expires_in_seconds INT DEFAULT 3600,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_materials_category ON public.materials(category);
CREATE INDEX IF NOT EXISTS idx_materials_created_at ON public.materials(created_at DESC);

-- 5. Automatically insert/update user profile on Auth Sign Up via Database Trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role, full_name, avatar_url)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_app_meta_data->>'role', 'student'),
    COALESCE(new.raw_user_meta_data->>'full_name', ''),
    COALESCE(new.raw_user_meta_data->>'avatar_url', '')
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    updated_at = timezone('utc'::text, now());

  INSERT INTO public.users (id, email, role, full_name, avatar_url)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_app_meta_data->>'role', 'student'),
    COALESCE(new.raw_user_meta_data->>'full_name', ''),
    COALESCE(new.raw_user_meta_data->>'avatar_url', '')
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    updated_at = timezone('utc'::text, now());

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger definition
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT OR UPDATE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- Row Level Security (RLS) Configuration
-- ============================================================================

-- Enable RLS on all exposed tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.materials ENABLE ROW LEVEL SECURITY;

-- ----------------------------------------------------------------------------
-- Policies for 'profiles' and 'users' Tables
-- ----------------------------------------------------------------------------

CREATE POLICY "Users can read own profile"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = id)
  WITH CHECK ((select auth.uid()) = id);

CREATE POLICY "Users can read own user record"
  ON public.users
  FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = id);

-- ----------------------------------------------------------------------------
-- Policies for 'materials' Table (Read-only for Students, Admin only for Mutating)
-- ----------------------------------------------------------------------------

-- Standard authenticated and anonymous students have SELECT (read-only) access
CREATE POLICY "Allow public read access to study materials"
  ON public.materials
  FOR SELECT
  TO authenticated, anon
  USING (true);

-- Define Admin User ID restriction for privileged INSERT, UPDATE, DELETE operations
-- Target Admin UUID can be updated to specific Admin User ID in production
CREATE POLICY "Admin only insert access for materials"
  ON public.materials
  FOR INSERT
  TO authenticated
  WITH CHECK (
    (select auth.uid()) = '00000000-0000-0000-0000-000000000000'::uuid
  );

CREATE POLICY "Admin only update access for materials"
  ON public.materials
  FOR UPDATE
  TO authenticated
  USING (
    (select auth.uid()) = '00000000-0000-0000-0000-000000000000'::uuid
  )
  WITH CHECK (
    (select auth.uid()) = '00000000-0000-0000-0000-000000000000'::uuid
  );

CREATE POLICY "Admin only delete access for materials"
  ON public.materials
  FOR DELETE
  TO authenticated
  USING (
    (select auth.uid()) = '00000000-0000-0000-0000-000000000000'::uuid
  );

-- Insert sample seed data for 1st-year curriculum testing
INSERT INTO public.materials (id, title, description, category, file_url, storage_path, video_id, is_temp)
VALUES
  (
    '11111111-1111-1111-1111-111111111111',
    'Mathematics-1 & Engineering Physics',
    'Differential calculus, matrix algebra, wave optics, electromagnetic field theory, and quantum mechanics problem sets.',
    'core',
    'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    'pdfs/math1-physics.pdf',
    NULL,
    false
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    'Data Structures & Algorithms Cheat Sheet',
    'Essential tree traversals, graph algorithms (Dijkstra, A*), dynamic programming patterns, and time complexity chart.',
    'core',
    'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    'pdfs/dsa-cheatsheet.pdf',
    NULL,
    false
  ),
  (
    '33333333-3333-3333-3333-333333333333',
    'Technical Writing & Professional Communication',
    'Guides on writing clear documentation, technical proposals, research papers, and executive summaries.',
    'non-core',
    'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    'pdfs/tech-writing-guide.pdf',
    NULL,
    false
  ),
  (
    '44444444-4444-4444-4444-444444444444',
    'Engineering Ethics & Intellectual Property',
    'Discussion of patent laws, copyright, open-source licensing, and ethical decision-making in engineering.',
    'non-core',
    'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    'pdfs/engineering-ethics.pdf',
    NULL,
    false
  ),
  (
    '55555555-5555-5555-5555-555555555555',
    'Data Structures & Neural Networks Masterclass',
    'Unlisted YouTube lecture video explaining Transformers, Convolutional Networks, and Backpropagation calculus.',
    'lecture',
    NULL,
    NULL,
    'dQw4w9WgXcQ',
    false
  ),
  (
    '66666666-6666-6666-6666-666666666666',
    'System Design & Distributed Systems Masterclass',
    'Unlisted YouTube video lecture detailing load balancing, consistent hashing, database sharding, and caching strategies.',
    'lecture',
    NULL,
    NULL,
    'L302GZou0jI',
    false
  ),
  (
    '77777777-7777-7777-7777-777777777777',
    'Midterm Exam Practice Solutions (Time-Limited)',
    'Confidential midterm examination solution sheet. Access expires automatically after signed link timeout.',
    'temp_pdf',
    'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    'temp-vault/midterm-solutions-2026.pdf',
    NULL,
    true
  )
ON CONFLICT (id) DO NOTHING;
