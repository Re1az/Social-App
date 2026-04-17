import express from 'express';
//importing dependencies
import mongoose, { mongo } from 'mongoose';
import dotenv from 'dotenv';
import cloudinary from 'cloudinary';

//importing routes and handlers
import postRoutes from './routes/postRoutes.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';

//Load environment variables
dotenv.config({
  quiet: true
}
);

cloudinary.v2.config({
  cloud_name: process.env.Clodinary_Cloud_Name,
  api_key: process.env.Clodinary_Api,
  api_secret: process.env.Clodinary_Secret,
});

const app =express();
//usning middleware
app.use(express.json());

//Register API routes
app.use('/api/posts',postRoutes);
app.use('/api/users',userRoutes);
app.use('/api/auth',authRoutes);

//connecting to database and start server only after database is connected
mongoose.connect(process.env.DB_URL).then((val)=>{
  app.listen(process.env.PORT,()=>{ 
    console.log(`Database connected and server is running on http://localhost:${process.env.PORT} `);
  })
}).catch((err)=>{
  console.log(err);
})
//test route to verify server is running
app.get('/',(req,res)=>{
  res.send('hello');
})

