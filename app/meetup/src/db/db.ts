import { Sequelize } from 'sequelize';

export default new Sequelize(
  process.env.POSTGRES_DB!,
  process.env.POSTGRES_USER!,
  process.env.POSTGRESS_PASSWORD!,
  {
    dialect: 'postgres',
    host: process.env.POSTGRES_HOST!,
    port: process.env.POSTGRESS_PORT ? parseInt(process.env.POSTGRESS_PORT, 10) : 5432
  }
);
