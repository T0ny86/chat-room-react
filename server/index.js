import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import socket from 'socket.io'

import dotenv from 'dotenv'
dotenv.config({ path: "./.dotenv" })

import userRoutes from "./routes/userRoutes.js"
import msgRoutes from './routes/messageRoutes'

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT
const dbURL = process.env.MONGO_URL


app.use("/api/auth", userRoutes)
app.use("/api/messages", msgRoutes)




mongoose.connect(dbURL)
    .then(() => {
        const server = app.listen(PORT, () => console.log(`Server running on posrt: ${PORT}`))
        const io = socket(server, {
            cors: {
                origin: "http://localhost:3000",
                Credential: true,
            }
        })
        global.ononlineUsers = new Map();
        io.on("connection", (socket) => {
            global.chatSocket = socket
            socket.on("add-user", (userId) => {
                onlineUsers.set(userId, socket.id)
            })
        })
        socket.on("send-msg", (data) => {
            const sendUserSocket = onlineUsers.get(data.to);
            if (sendUserSocket) {
                socket.to(sendUserSocket).emit("msg-recieve", data.msg);
            }
        });
    })
    .catch((error) => {
        console.log(error)
    })
