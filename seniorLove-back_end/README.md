# seniorLove-back

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:

   ```sh
   git clone git@github.com:O-clock-Pavlova/seniorLove-back.git
   ```

2. **Navigate to the project directory**:

   ```sh
   cd DIRECTORYPATH/
   ```

3. **Install the dependencies**:

   ```sh
   pnpm install
   ```

4. **Create PSQL Database**:
   - Connect to postgres as a superuser (postgres user) via psql
   - Create new user with password
   ```sql
   CREATE USER username WITH PASSWORD 'password';
   ```
   - Create database owned by user
   ```sql
   CREATE DATABASE databaseName OWNER username;
   ```

5. **Setup the .env**

   - Create `.env` file
   - Fill it with your credentials, you can find .env variables inside `.env.example`

6. **Init NODE_ENV**:

   - Windows :
   ```sh
   $env:NODE_ENV = 'development'
   ```

   - MacOS / Linux :
   ```sh
   export NODE_ENV=development
   ```

7. **Set up the PostgreSQL database**:

   - Init the tables creation script inside `package.json`
   ```sh
   pnpm prestart
   ```
   - Create tables and populate with test data
   ```sh
   pnpm db:reset
   ```

8. **Launch unit tests (optional)**:
   ```sh
   pnpm test
   ```
   
9. **Start the server**:
   ```sh
   pnpm dev
   ```
