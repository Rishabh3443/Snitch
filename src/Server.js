import app from "./app/app.js";
import dbConnect from './config/db.js'

await dbConnect();

app.listen(3000,()=>{
    console.log("server is running on port 3000");
    
})