-- Migration: Sync Clerk IDs with Supabase Tables
-- Run this in your Supabase SQL Editor

-- 1. Drop existing shares table (easier than altering and keeping constraints)
DROP TABLE IF EXISTS shares;

-- 2. Drop existing files table
DROP TABLE IF EXISTS files;

-- 3. Drop existing users table (Clerk will manage this)
DROP TABLE IF EXISTS users;

-- 4. Create Files Table with VARCHAR for user_id to match Clerk
CREATE TABLE IF NOT EXISTS files (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  size BIGINT NOT NULL,
  type VARCHAR(100) NOT NULL,
  url TEXT NOT NULL,
  user_id VARCHAR(255) NOT NULL, -- Clerk User ID
  parent_id INTEGER DEFAULT NULL,
  is_folder BOOLEAN DEFAULT FALSE,
  is_starred BOOLEAN DEFAULT FALSE,
  is_trash BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Create Shares Table
CREATE TABLE IF NOT EXISTS shares (
    id SERIAL PRIMARY KEY,
    file_id INTEGER REFERENCES files(id) ON DELETE CASCADE,
    shared_by VARCHAR(255) NOT NULL,
    shared_with VARCHAR(255) NOT NULL,
    permission VARCHAR(20) DEFAULT 'viewer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(file_id, shared_with)
);

-- 6. Add is_public column (optional but useful)
ALTER TABLE files ADD COLUMN IF NOT EXISTS is_public BOOLEAN DEFAULT FALSE;

-- Success message
-- Migration completed successfully.
