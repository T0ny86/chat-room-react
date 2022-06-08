import express from "express"
const router = express.Router();
import * as user from "../controllers/user.js"

router.post("/signup", user.signup)
router.post("/login", user.login)
router.post("/setAvatar/:id", user.setAvatar)
router.post("/allUsers/:id", user.getAllUsers)
router.get("/logout/:id", user.logOut);

export default router;