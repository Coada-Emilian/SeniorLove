// Purpose: Sequelize client that connects to the database.

import 'dotenv/config';
import { Sequelize } from 'sequelize';

// The sequelize instance is created and exported.
export let sequelize;

// Sequelize client declaration based on the environment.
if (process.env.NODE_ENV === 'development') {
  // The development environment uses the PG_URL environment variable to connect to the database.
  sequelize = new Sequelize(process.env.PG_URL, {
    logging: false,
    define: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  });
} else if (process.env.NODE_ENV === 'production') {
  // The production environment uses the PG_URL environment variable to connect to the database.
  sequelize = new Sequelize(process.env.PG_URL, {
    logging: false,
    define: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    // The dialectOptions object is used to configure the SSL connection.
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
} else {
  throw new Error(
    'NODE_ENV must be set to either "development" or "production"'
  );
}

// The connection to the database is tested.
sequelize.authenticate();
