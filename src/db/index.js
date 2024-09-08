import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";


const connectDB = async () => {

    try{
      const connectionInstance =  await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`) //MONGODB_URI is in .env $ DB_NAME is in constant.js
      console.log(`\n MONGO DB CONNECTED !! DB HOST: ${connectionInstance.connection.host}`) //"connectionInstance" typically refers to an instance of a connection to a database or other services that your Express app might interact with.

     }catch(error){
        console.log("MONGODB CONNECTION ERROR:",error )
        process.exit(1) //process is a predifined method in Node.js that gives the reference to the runnic process
        
    }
}

export default connectDB