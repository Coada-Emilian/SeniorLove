import fs from 'fs/promises';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

// Define the path to package.json
const packageJsonPath = './package.json';

async function replaceVars() {
  try {
    // Read package.json
    const data = await fs.readFile(packageJsonPath, 'utf8');
    const packageJson = JSON.parse(data);

    // Replace 'seniorlove' with the environment variable
    const dbName = process.env.DB_NAME || 'seniorlove';
    const dbUser = process.env.DB_USER || 'seniorlove';
    const pgUrl = process.env.PG_URL || 'seniorlove';

    if (process.env.NODE_ENV === 'production') {
      // Update the prod scripts in package.json
      packageJson.scripts['db:create'] =
        `psql ${pgUrl} -f data/create_tables.sql`;
      packageJson.scripts['db:populate'] =
        `node data/populate_tables_users.js && psql ${pgUrl} -f data/populate_tables_1.sql && psql ${pgUrl} -f data/populate_tables_2.sql`;
      packageJson.scripts['db:reset'] =
        `pnpm run db:create && node data/populate_tables_users.js && psql ${pgUrl} -f data/populate_tables_1.sql && psql ${pgUrl} -f data/populate_tables_2.sql`;
    } else if (process.env.NODE_ENV === 'development') {
      // Update the dev scripts in package.json
      packageJson.scripts['db:create'] =
        `psql -U ${dbUser} -d ${dbName} -f data/create_tables.sql`;
      packageJson.scripts['db:populate'] =
        `node data/populate_tables_users.js && psql -U ${dbUser} -d ${dbName} -f data/populate_tables_1.sql && psql -U ${dbUser} -d ${dbName} -f data/populate_tables_2.sql`;
      packageJson.scripts['db:reset'] =
        `pnpm run db:create && node data/populate_tables_users.js && psql -U ${dbUser} -d ${dbName} -f data/populate_tables_1.sql && psql -U ${dbUser} -d ${dbName} -f data/populate_tables_2.sql`;
    }

    // Write the updated package.json back to file
    await fs.writeFile(
      packageJsonPath,
      JSON.stringify(packageJson, null, 2),
      'utf8'
    );

    console.log(`Updated package.json with database name: ${dbName}`);
  } catch (error) {
    console.error('Error updating package.json:', error);
  }
}

replaceVars();
