CREATE TABLE IF NOT EXISTS shares (
    id SERIAL PRIMARY KEY,
    file_id INTEGER REFERENCES files(id) ON DELETE CASCADE,
    shared_by INTEGER REFERENCES users(id),
    shared_with INTEGER REFERENCES users(id),
    permission VARCHAR(20) DEFAULT 'viewer', -- 'viewer' or 'editor'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(file_id, shared_with)
);

-- Add a column to files for public sharing
ALTER TABLE files ADD COLUMN IF NOT EXISTS is_public BOOLEAN DEFAULT FALSE;
