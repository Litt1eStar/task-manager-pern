import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
dotenv.config()

import authRoute from './src/auth/auth.route.js'
import taskContainerRoute from './src/task_container/task_container.route.js'
import userRoute from './src/user/user.route.js';

const server = express();

server.use(express.json())
server.use(cookieParser());

server.use("/api/auth", authRoute);

server.use("/api/container", taskContainerRoute)
server.use("/api/user", userRoute);

server.listen(process.env.PORT, ()=> {
    console.log(`Connected to Port : ${process.env.PORT}`)
})