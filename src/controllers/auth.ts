import { connection } from "../db"
import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import md5 from "md5"

export const registerUser = async (req: Request, res: Response) => {
  try {
    const nome = req.body.nome
    const email = req.body.email
    const password = md5(req.body.password)
  
    const sql = `INSERT INTO user_data(nome, email, password) VALUES ('${nome}', '${email}', '${password}')`

    const query = await connection.query(sql)
    return res.status(200).json({ status: "User created!" })
  } catch (error) {
    return res.status(401).json(error)
  }
}

export const loginUser = async (req: Request, res: Response) => {
  try {
    const email = req.body.email
    const password = md5(req.body.password)

    const sql = `SELECT nome, email, id_user FROM user_data WHERE email = '${email}' AND password = '${password}'`
    const query = await connection.query(sql)

    const userToken = jwt.sign({
      "id_user": query.rows[0].id_user,
      "email": query.rows[0].email
    }, 'secret', { expiresIn: 60 * 5 })

    return res.status(201).json({ 
      status: `Olá, ${query.rows[0].nome}` ,
      token: userToken
    })
  } catch (error) {
    return res.status(401).json({ error: "Senha ou usuário incorreto!" })
  }
}

export const authPage = async (req: Request, res: Response) => {
  const userToken = req.headers['authorization']

  const verifyToken = jwt.verify(userToken, 'secret', (err, decoded) => {
    if(err) {
      return res.status(401).json({ error: "Token expirado ou inválido!" })
    }
    return res.status(200).json({ succes: decoded })
  })
}