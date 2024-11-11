export const DATABASE = 'database';

const env = process.env;

export const EnvConfiguration = () => ({
  environment: env.NODE_ENV,

  port: env.PORT,

  [DATABASE]: {
    databaseName: env.DATABASE_NAME,
    databaseHost: env.DATABASE_HOST,
    databasePort: env.DATABASE_PORT,
  },
});
