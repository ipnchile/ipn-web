CREATE TABLE IF NOT EXISTS instagram_feed (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  enabled INTEGER NOT NULL DEFAULT 0,
  items TEXT NOT NULL DEFAULT '[]',
  synced_at TEXT,
  attempted_at TEXT,
  error TEXT,
  locked_until INTEGER NOT NULL DEFAULT 0
);
INSERT OR IGNORE INTO instagram_feed(id) VALUES(1);
