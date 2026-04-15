import express from 'express';
import postRoutes from './routes/postRoutes.js';
import mongoose, { mongo } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({
  quiet: true
}
);


const app =express();

app.use('/posts',postRoutes);


mongoose.connect(process.env.DB_URL).then((val)=>{
  app.listen(5000,()=>{
    console.log("Database connected and server is running in port 5000");
  })
}).catch((err)=>{
  console.log(err);
})

