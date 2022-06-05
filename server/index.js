import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config({path: "./.dotenv"})
const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT
const dbURL = process.env.MONGO_URL


mongoose.connect(dbURL)
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on posrt: ${PORT}`))
    })
    .catch((error) => {
        console.log(error)
    })
