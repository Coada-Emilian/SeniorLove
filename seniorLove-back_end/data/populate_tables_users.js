// Purpose: Populate the users and admin tables with data from users_data_70.json and admins_data.json

// Imports
import { pgClient } from './pgClient.js';
import { Scrypt } from '../src/auth/Scrypt.js';
import users from './users_data_70.json' with { type: 'json' }; //if assert does not work replace it with "with"
import admins from './admins_data.json' with { type: 'json' }; //if assert does not work replace it with "with"

// Connect to the database
await pgClient.connect();

// Insert data into the users table
for (const user of users) {
  const {
    name,
    birth_date,
    description,
    gender,
    picture_url,
    email,
    status,
    password,
  } = user;

  // Hash the password
  const hashedPassword = Scrypt.hash(password);

  // Insert the user into the database with SQL injection protection
  const query = `INSERT INTO users (name, birth_date, description, gender, picture_url, email, password, status)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`;

  // Execute the query
  const result = await pgClient.query(query, [
    name,
    birth_date,
    description,
    gender,
    picture_url,
    email,
    hashedPassword,
    status,
  ]);
  console.log(result.rows);
}

for (const admin of admins) {
  const { name, email, password } = admin;
  const hashedPassword = Scrypt.hash(password);

  const query = `INSERT INTO administrators (name, email, password)
        VALUES ($1,$2,$3) RETURNING *`;

  const result = await pgClient.query(query, [name, email, hashedPassword]);
  console.log(result.rows);
}

await pgClient.end();
