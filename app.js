import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin:process.env.CorsOrigin,
    credentials:true
}))

app.use(express.json({limit:"20kb"}));
app.use(express.urlencoded({extended:true,limit:"20kb"}));
app.use(express.static("public"));
app.use(cookieParser());


// imports routes
import UserRouter from './routes/user.routes.js';

app.use("/users",UserRouter);   // http://localhost:8000/users/register

export {app}