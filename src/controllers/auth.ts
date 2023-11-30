import db from "../db"
import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import md5 from "md5"

const registerUser = async (req: Request, res: Response) => {
  const nome = req.body.nome
  const email = req.body.email
  const password = req.body.password
  
}

export default {
  registerUser
}