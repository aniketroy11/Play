import dotenv from 'dotenv'
import express from "express";
import connectDB from './db/index.js';
import {app} from './app.js'

dotenv.config();


connectDB().
then(()=>{
    app.listen(process.env.PORT || 5000,()=>{
        console.log(`Server is running on port: http://localhost:${process.env.PORT}`);
    });
}).
catch((error)=>{
    console.log("ERR:",error);
});




























// ;(async()=>{
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}`);
//         console.log("mongoose are connected !!");
//         app.listen(process.env.PORT,(error)=>{
//             if(!error){
//                 console.log(`Server is running on ${process.env.PORT}`);
//             }
//             else{
//                 console.log("Error:",error);
//             }
//         })
//     } catch (error) {
//         console.log("ERR: ",error)
//     }
// })();