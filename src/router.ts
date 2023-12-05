import { Router, Request, Response } from "express"
import { authPage, loginUser, registerUser } from "./controllers/auth"

const router = Router()

router.get("/test", (req: Request, res: Response) => {
  res.status(200).json({test: "ok"})
})
.post("/register", registerUser)
.post("/login", loginUser)
.post("/authpage", authPage)

export default router