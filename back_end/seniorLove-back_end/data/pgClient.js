// Purpose: Create a new instance of a pg client to connect to the database.

// Imports
import 'dotenv/config';
import pg from 'pg';

// Create a new instance of a pg client to connect to the database.
const { Client } = pg;

// Create a new instance of a pg client to connect to the database.
export const pgClient = new Client(process.env.PG_URL);
