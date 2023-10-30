import express from 'express'
import mongoose from "mongoose";
import bodyParser from 'body-parser';
import Route from './route.ts'
import dotenv from 'dotenv';
dotenv.config()

const user = process.env.DB_USER
const password = process.env.DB_PASSWORD
mongoose.connect(`mongodb+srv://${user}:${password}@cluster0.xycuuto.mongodb.net/`);
const db = mongoose.connection

db.on('error', (err) => {
    console.log(err)
})

db.once('open', () => {
    console.log('Database Connected')
})

const app = express()

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

const PORT = 8090

app.listen(PORT, () => 
    console.log(`Server is running successfully on port ${PORT}`)
)

app.use('/api', Route)