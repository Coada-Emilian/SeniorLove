-- Purpose: Create the tables in the database.

-- Set the encoding to UTF8
SET client_encoding = 'UTF8';

-- Begin the transaction
BEGIN;

-- Drop the tables if they already exist
DROP TABLE IF EXISTS "users", "administrators", "events", "hobbies", "users_messages", "users_events", "users_hobbies", "events_hobbies";

-- Create the tables
-- Table: users
CREATE TABLE users (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" VARCHAR(50) NOT NULL,
    "birth_date" DATE NOT NULL,
    "description" TEXT,
    "gender" VARCHAR(10) NOT NULL,
    "picture_url" TEXT,
    "picture_id" VARCHAR(255),
    "email" VARCHAR(255) UNIQUE NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "old_password" VARCHAR(255),
    "new_password" VARCHAR(255),
    "repeat_new_password" VARCHAR(255),
    "status" VARCHAR(10) DEFAULT 'pending',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

-- Table: administrators
CREATE TABLE administrators (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100) UNIQUE NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

-- Table: events
CREATE TABLE events (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" VARCHAR(100) NOT NULL,
    "location" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "picture_url" VARCHAR(255),
    "picture_id" VARCHAR(255),
    "date" DATE NOT NULL,
    "time" TIME NOT NULL,
    "admin_id" INT REFERENCES "administrators"("id") ON DELETE SET NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

-- Table: hobbies
CREATE TABLE hobbies (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

-- Table: users_messages
CREATE TABLE users_messages (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "message_content" TEXT NOT NULL,
    "sender_id" INT REFERENCES "users"("id") ON DELETE SET NULL,
    "receiver_id" INT REFERENCES "users"("id") ON DELETE SET NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

-- Table: users_events
CREATE TABLE users_events (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "user_id" INT NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
    "event_id" INT NOT NULL REFERENCES "events"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

-- Table: users_hobbies
CREATE TABLE users_hobbies (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "user_id" INT NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
    "hobby_id" INT NOT NULL REFERENCES "hobbies"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

-- Table: events_hobbies
CREATE TABLE events_hobbies (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "event_id" INT NOT NULL REFERENCES "events"("id") ON DELETE CASCADE,
    "hobby_id" INT NOT NULL REFERENCES "hobbies"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);


-- Commit the transaction
COMMIT;
