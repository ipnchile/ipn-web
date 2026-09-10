-- Preserve existing documents and immutable history while adding video documents.
PRAGMA defer_foreign_keys = ON;
CREATE TABLE documents_with_videos (id TEXT PRIMARY KEY, kind TEXT NOT NULL CHECK(kind IN ('news','event','banner','video')), draft TEXT NOT NULL CHECK(json_valid(draft)), published TEXT CHECK(published IS NULL OR json_valid(published)), revision INTEGER NOT NULL DEFAULT 1, updated_at TEXT NOT NULL, updated_by TEXT NOT NULL);
INSERT INTO documents_with_videos SELECT * FROM documents;
DROP TABLE documents;
ALTER TABLE documents_with_videos RENAME TO documents;
PRAGMA defer_foreign_keys = OFF;
