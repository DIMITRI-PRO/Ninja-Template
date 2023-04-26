import dotenv from "dotenv";
import fs from "fs";
import mysql from "mysql2/promise";

const { config } = dotenv;

config();

const migrate = async () => {
  const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

  const connection = await mysql.createConnection({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    multipleStatements: true,
  });

  await connection.query(`drop database if exists ${DB_NAME}`);
  await connection.query(`create database ${DB_NAME}`);
  await connection.query(`use ${DB_NAME}`);

  const sql = fs.readFileSync("./database.sql", "utf8");

  await connection.query(sql);

  console.warn(`end migration into ${DB_NAME}`);

  connection.end();
};

try {
  migrate();
} catch (err) {
  console.error(err);
}
