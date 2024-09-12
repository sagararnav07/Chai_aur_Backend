import dotenv from "dotenv"   //it will not work from directly importing it we must configure it
import connectDB from "./db/index.js";

/* the given configuration will not work until you add an experimental feature in package.json like this in the "script" tag
  "dev": "nodemon -r dotnev/config --experimental-json-modules src/index.js"*/ 
dotenv.config({
    path: './env' //root directory
})


//2nd approach
connectDB()  
//after DB is connected we must do error handling for i.e .then()/.catch()

.then(() => {
  try{ //Try catch block to check if app is litsening or not if not then  app.litsen will never execute
   mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`) //MONGODB_URI is in .env $ DB_NAME is in constant.js
    app.on("error", (error) => { //".on" is a listener of express 
         console.log("ERROR:", error)  //this method checks if express is able to talk to the database or not by using ".on" listener and if not then it gives error when then is send that error , through a call back function in which we pass that error as a parameter and then that error throws
         throw error
    }) 
    app.litsen(process.env.PORT || 8000, () => {
      console.log(`. Server is running at port: ${process.env.PORT}`)})
  }catch(error){
      console.error("Error:", error)
      throw error
  }
})
.catch((err) => {
    console.log(`Mongo DB connection failed error`,err)
})

/*

//1st APPROACH :- THIS IS NOT A VERY PROFICIENT APPROACH AS THE INDEX.JS FILE GETS TOO MUCH POLLUTED, BETTER IS TO WRITE A FUNCTION ELSE WHERE AND CALL IT HERE
//Connecting DB using IIFE, async/await and try/catch
(async() => {
  try{
     await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`) //MONGODB_URI is in .env $ DB_NAME is in constant.js
     app.on("error", (error) => { //".on" is a listener of express 
          console.log("ERROR:", error)  //this method checks if express is able to talk to the database or not by using ".on" listener and if not then it gives error when then is send that error , through a call back function in which we pass that error as a parameter and then that error throws
          throw error
     }) 
      app.litsen(process.env.PORT, () => {  //this method will execute if the above method is not true, where it will pass a call back function tracing the port where the Database is litsening 
        console.log(`App is litsening on port ${process.env.PORT}`)
      })

   }catch(error){
        console.error("Error:", error)
        throw error
    }
})()


*/