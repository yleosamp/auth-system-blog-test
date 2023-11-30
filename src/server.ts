import express from "express";
import cors from "cors"
import db from "./db"
import router from "./router"

require("dotenv").config()
const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use("/api", router)

app.listen(PORT, async () => {
  await db()
  console.log("Servidor iniciado!")
})