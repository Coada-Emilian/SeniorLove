// Purpose: Populate the users table with data from users_data_70.json

// Imports
import { pgClient } from './pgClient.js';
import { Scrypt } from '../src/auth/Scrypt.js';
import users from './users_data_70.json' with { type: 'json' }; //if assert does not work replace it with "with"
import admins from './admins_data.json' with { type: 'json' }; //if assert does not work replace it with "with"

// Connect to the database
await pgClient.connect();

// Insert data into the users table
for (const user of users) {
  const name = user.name;
  const birth = user.birth_date;
  const description = user.description;
  const gender = user.gender;
  const picture = user.picture;
  const email = user.email;
  const status = user.status;

  // Hash the password
  const password = Scrypt.hash(user.password);

  // Insert the user into the database with SQL injection protection
  const query = `INSERT INTO users (name, birth_date, description, gender, picture, email, password, status)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`;

  // Execute the query
  const result = await pgClient.query(query, [
    name,
    birth,
    description,
    gender,
    picture,
    email,
    password,
    status,
  ]);
  console.log(result.rows);
}

for (const admin of admins) {
  const name = admin.name;
  const email = admin.email;
  const password = Scrypt.hash(admin.password);

  const query = `INSERT INTO administrators (name, email, password)
        VALUES ($1,$2,$3) RETURNING *`;

  const result = await pgClient.query(query, [name, email, password]);
  console.log(result.rows);
}

await pgClient.end();
