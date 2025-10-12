import mongoose from "mongoose";
import { log } from "util";

type ConnectionObject={
    isConnected?:number
}

const connection:ConnectionObject={}

async function dbConnect():Promise<void> {
    if(connection.isConnected) {
        console.log("Already connected database");
        return
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || "")
        connection.isConnected = db.connections[0].readyState
        console.log("DB connected successfully");
        
    } catch (error) {
        console.error("database connection error",error);
        process.exit(1)
    }
}

export default dbConnect