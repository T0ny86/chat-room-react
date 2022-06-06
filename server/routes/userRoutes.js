import express from "express"
const router = express.Router();
import * as user from "../controllers/user.js"

router.post("/signup", user.signup)


export default router;