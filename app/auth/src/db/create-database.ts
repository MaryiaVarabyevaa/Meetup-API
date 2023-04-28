import dotenv from 'dotenv';
import sequelize from './db';

dotenv.config();

async function createDatabase() {
  try {
    console.log(`Creating database ${process.env.DB_NAME}...`);
    await sequelize.query(`CREATE DATABASE ${process.env.DB_NAME}`);
    console.log(`Database ${process.env.DB_NAME} created successfully`);
  } catch (error) {
    console.error(`Unable to create database: ${error}`);
  } finally {
    await sequelize.close();
  }
}

createDatabase();
