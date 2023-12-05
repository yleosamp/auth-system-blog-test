import { Client } from "pg"
require("dotenv").config()

export const connection = new Client({
  host: "localhost",
  port: 5432,
  database: "authtest",
  user: "postgres",
  password: process.env.DB_PASS,
})

const db = async () => {
  try {
    await connection.connect()

    await connection.query(`
      CREATE TABLE IF NOT EXISTS user_data(
        id_user SERIAL PRIMARY KEY,
        nome VARCHAR(64),
        password VARCHAR(128),
        foto TEXT,
        sobre TEXT,
        email VARCHAR(256)
      );
    `)

    await connection.query(`
      CREATE TABLE IF NOT EXISTS post(
        id_post SERIAL PRIMARY KEY,
        id_user INTEGER REFERENCES user_data(id_user),
        post_text TEXT,
        post_category VARCHAR(64),
        post_tags TEXT
      );
    `)

    console.log("Banco de dados conectado!")
  } catch (error) {
    console.log(`Erro ao conectar no banco! Erro: ${error}`)
  }
}

export default db