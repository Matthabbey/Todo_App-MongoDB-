import express from "express"
import logger from 'morgan';
import todoRoute from './routes/todoRoute'
import dotenv from 'dotenv'
import connectMongoDB from "./config";
dotenv.config()

connectMongoDB()

const app = express()
app.use(express.json())
app.use(logger("dev"))

//Routes to endpoints
app.use('/todo', todoRoute)


const port = 8000

app.listen(port, ()=>{
    console.log(`Server running at http://localhost${port}`)
})