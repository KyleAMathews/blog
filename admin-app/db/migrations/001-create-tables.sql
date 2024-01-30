CREATE TYPE subscriber_state AS ENUM ('needs_verification', 'verified', 'unsubscribed');

CREATE TABLE subscribers (
    email TEXT PRIMARY KEY,
    state subscriber_state NOT NULL,
    last_updated TIMESTAMP WITH TIME ZONE
);

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE events (
    id UUID PRIMARY KEY,
    event_type TEXT NOT NULL,
    actor TEXT NOT NULL,
    target_email TEXT NOT NULL,
    attributes JSONB,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL
);

ALTER TABLE subscribers ENABLE ELECTRIC;
ALTER TABLE events ENABLE ELECTRIC;
