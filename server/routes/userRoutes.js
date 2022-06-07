import express from "express"
const router = express.Router();
import * as user from "../controllers/user.js"

router.post("/signup", user.signup)
router.post("/login", user.login)
router.post("/setAvatar/:id", user.setAvatar)


export default router;