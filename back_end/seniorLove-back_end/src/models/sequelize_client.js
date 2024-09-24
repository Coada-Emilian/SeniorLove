// Purpose: Sequelize client that connects to the database.

import 'dotenv/config';
import { Sequelize } from 'sequelize';

// The sequelize instance is created and exported.
export let sequelize;

// Sequelize client declaration based on the environment.
if (process.env.NODE_ENV === 'development') {
  sequelize = new Sequelize(process.env.PG_URL, {
    logging: false,
    define: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  });
} else if (process.env.NODE_ENV === 'production') {
  sequelize = new Sequelize(process.env.PG_URL, {
    logging: false,
    define: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
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
