import express from 'express';
import postRoutes from './routes/postRoutes.js';



const app =express();

app.use('/posts',postRoutes);

app.get('/',(req,res)=>{

  const{number}=req.query;
  console.log( Number(number));
  return res.status(200).json({
    message:`your number is ${number%2===0?"even":"odd"}`
  })
})
const posts=[
  {id:1,title:"post 1"},
  {id:2,title:"post 2"},
  {id:3,title:"post 3"},
  {id:4,title:"post 4"},
  {id:5,title:"post 5"},
  {id:6,title:"post 6"},
  {id:7,title:"post 7"},
  {id:8,title:"post 8"},
  {id:9,title:"post 9"},
  {id:10,title:"post 10"},
  ]

app.get('/posts',(req,res)=>{
 return res.status(200).json(posts);
})

app.get('/posts/:id',(req,res)=>{
  const {id}=req.params;
  const result=posts.find((post)=>post.id===Number(id));
  if(result){
    return res.status(200).json(result);
  }
  return res.status(404).json({message:"post not found"});
  
})
app.listen(5000, ()=>{
  console.log("Server is running in port 5000");
})