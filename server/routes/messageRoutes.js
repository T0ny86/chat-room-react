import express from 'express'
import * as Msg from '../controllers/messages'
const router = express.Router()

router.post("/addmsg/", Msg.addMessages)
router.post("/getmsg/", Msg.getMessages)

export default router