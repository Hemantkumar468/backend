// require('dotenv').config({path :'./env'})

import dotenv from "dotenv"
import connectDB from "./db/index.js";
import { app } from "./app.js";


dotenv.config({
    path: './.env'
})

const PORT = process.env.PORT || 8000;


connectDB()
.then(()=>{
  app.listen(process.env.PORT || 8000 ,() =>{
  console.log(`server is running at PORT: ${PORT}`);

    
  })
})
.catch((error)=>console.log("mongo db connection  failes ",error))












// import express from "express";


// const app = express()

// ;(async()=>{
//     try {
//       await  mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//       app.on("error",(error)=>{
//         console.log("error:","error");
//         throw error
        
//       })
//       app.listen(process.env.PORT,()=>{
//          console.log(`app is listen on port ${process.env.PORT}`);
         
//       })
//     } catch (error) {
//         console.log("error:" ,error);
//         throw error
        
//     }
// })()