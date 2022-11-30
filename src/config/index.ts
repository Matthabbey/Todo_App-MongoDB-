import mongoose from 'mongoose'
import dotenv from 'dotenv'

const connectMongoDB = async ()=>{

 const connect = await mongoose.connect(process.env.DATABASE_URL!)
 console.log(`Connection to MONGODB is successful`)
}

export default connectMongoDB