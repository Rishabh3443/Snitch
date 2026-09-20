import mongoose from "mongoose"
import Config  from "./config.js"

const dbConnect = async()=>{
    console.log("connection string =>",Config.MONGO_URI);
 
     await mongoose.connect(Config.MONGO_URI)
     
     
     console.log("database Connected");
}

export default dbConnect;