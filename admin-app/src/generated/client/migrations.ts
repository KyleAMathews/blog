export default [
  {
    "statements": [
      "CREATE TABLE \"subscribers\" (\n  \"email\" TEXT NOT NULL,\n  \"state\" TEXT NOT NULL,\n  \"last_updated\" TEXT,\n  CONSTRAINT \"subscribers_pkey\" PRIMARY KEY (\"email\")\n) WITHOUT ROWID;\n",
      "CREATE TABLE \"events\" (\n  \"id\" TEXT NOT NULL,\n  \"event_type\" TEXT NOT NULL,\n  \"actor\" TEXT NOT NULL,\n  \"target_email\" TEXT NOT NULL,\n  \"attributes\" TEXT_JSON,\n  \"created_at\" TEXT NOT NULL,\n  CONSTRAINT \"events_pkey\" PRIMARY KEY (\"id\")\n) WITHOUT ROWID;\n",
      "-- Toggles for turning the triggers on and off\nINSERT OR IGNORE INTO _electric_trigger_settings(tablename,flag) VALUES ('main.subscribers', 1);",
      "  /* Triggers for table subscribers */\n\n  -- ensures primary key is immutable\n  DROP TRIGGER IF EXISTS update_ensure_main_subscribers_primarykey;",
      "CREATE TRIGGER update_ensure_main_subscribers_primarykey\n  BEFORE UPDATE ON \"main\".\"subscribers\"\nBEGIN\n  SELECT\n    CASE\n      WHEN old.\"email\" != new.\"email\" THEN\n      \t\tRAISE (ABORT, 'cannot change the value of column email as it belongs to the primary key')\n    END;\nEND;",
      "-- Triggers that add INSERT, UPDATE, DELETE operation to the _opslog table\nDROP TRIGGER IF EXISTS insert_main_subscribers_into_oplog;",
      "CREATE TRIGGER insert_main_subscribers_into_oplog\n   AFTER INSERT ON \"main\".\"subscribers\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.subscribers')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'subscribers', 'INSERT', json_object('email', new.\"email\"), json_object('email', new.\"email\", 'last_updated', new.\"last_updated\", 'state', new.\"state\"), NULL, NULL);\nEND;",
      "DROP TRIGGER IF EXISTS update_main_subscribers_into_oplog;",
      "CREATE TRIGGER update_main_subscribers_into_oplog\n   AFTER UPDATE ON \"main\".\"subscribers\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.subscribers')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'subscribers', 'UPDATE', json_object('email', new.\"email\"), json_object('email', new.\"email\", 'last_updated', new.\"last_updated\", 'state', new.\"state\"), json_object('email', old.\"email\", 'last_updated', old.\"last_updated\", 'state', old.\"state\"), NULL);\nEND;",
      "DROP TRIGGER IF EXISTS delete_main_subscribers_into_oplog;",
      "CREATE TRIGGER delete_main_subscribers_into_oplog\n   AFTER DELETE ON \"main\".\"subscribers\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.subscribers')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'subscribers', 'DELETE', json_object('email', old.\"email\"), NULL, json_object('email', old.\"email\", 'last_updated', old.\"last_updated\", 'state', old.\"state\"), NULL);\nEND;",
      "-- Toggles for turning the triggers on and off\nINSERT OR IGNORE INTO _electric_trigger_settings(tablename,flag) VALUES ('main.events', 1);",
      "  /* Triggers for table events */\n\n  -- ensures primary key is immutable\n  DROP TRIGGER IF EXISTS update_ensure_main_events_primarykey;",
      "CREATE TRIGGER update_ensure_main_events_primarykey\n  BEFORE UPDATE ON \"main\".\"events\"\nBEGIN\n  SELECT\n    CASE\n      WHEN old.\"id\" != new.\"id\" THEN\n      \t\tRAISE (ABORT, 'cannot change the value of column id as it belongs to the primary key')\n    END;\nEND;",
      "-- Triggers that add INSERT, UPDATE, DELETE operation to the _opslog table\nDROP TRIGGER IF EXISTS insert_main_events_into_oplog;",
      "CREATE TRIGGER insert_main_events_into_oplog\n   AFTER INSERT ON \"main\".\"events\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.events')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'events', 'INSERT', json_object('id', new.\"id\"), json_object('actor', new.\"actor\", 'attributes', new.\"attributes\", 'created_at', new.\"created_at\", 'event_type', new.\"event_type\", 'id', new.\"id\", 'target_email', new.\"target_email\"), NULL, NULL);\nEND;",
      "DROP TRIGGER IF EXISTS update_main_events_into_oplog;",
      "CREATE TRIGGER update_main_events_into_oplog\n   AFTER UPDATE ON \"main\".\"events\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.events')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'events', 'UPDATE', json_object('id', new.\"id\"), json_object('actor', new.\"actor\", 'attributes', new.\"attributes\", 'created_at', new.\"created_at\", 'event_type', new.\"event_type\", 'id', new.\"id\", 'target_email', new.\"target_email\"), json_object('actor', old.\"actor\", 'attributes', old.\"attributes\", 'created_at', old.\"created_at\", 'event_type', old.\"event_type\", 'id', old.\"id\", 'target_email', old.\"target_email\"), NULL);\nEND;",
      "DROP TRIGGER IF EXISTS delete_main_events_into_oplog;",
      "CREATE TRIGGER delete_main_events_into_oplog\n   AFTER DELETE ON \"main\".\"events\"\n   WHEN 1 == (SELECT flag from _electric_trigger_settings WHERE tablename == 'main.events')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'events', 'DELETE', json_object('id', old.\"id\"), NULL, json_object('actor', old.\"actor\", 'attributes', old.\"attributes\", 'created_at', old.\"created_at\", 'event_type', old.\"event_type\", 'id', old.\"id\", 'target_email', old.\"target_email\"), NULL);\nEND;"
    ],
    "version": "1"
  }
]