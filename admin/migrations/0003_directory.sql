CREATE TABLE directory_records (
  id TEXT PRIMARY KEY,
  kind TEXT NOT NULL CHECK(kind IN ('church','person')),
  draft TEXT NOT NULL CHECK(json_valid(draft) AND length(draft) < 12000),
  published TEXT CHECK(published IS NULL OR (json_valid(published) AND length(published) < 12000)),
  revision INTEGER NOT NULL DEFAULT 1,
  updated_by TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE UNIQUE INDEX directory_church_slug ON directory_records(json_extract(draft,'$.slug')) WHERE kind='church';
CREATE INDEX directory_public ON directory_records(id,kind) WHERE published IS NOT NULL;
CREATE TRIGGER directory_size_limit BEFORE INSERT ON directory_records WHEN (SELECT count(*) FROM directory_records) >= 1000 BEGIN SELECT RAISE(ABORT,'Limite preventivo: 1000 registros de directorio'); END;
