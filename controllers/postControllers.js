export const getPosts=(req,res)=>{
  return res.status(200).json({
    message:'List of posts'
  })
}
export const getPost=(req,res)=>{
  const {id}=req.params;
  console.log(id);
  return res.status(200).json({
    message:'post'
  })
}
export const createPost=(req,res)=>{
  return res.status(201).json({
    message:'post created'
  })
}
export const updatePost=(req,res)=>{
  const {id}=req.params;
  console.log(id);
  return res.status(200).json({
    message:'post updated'
  })
}
export const deletePost=(req,res)=>{
  return res.status(200).json({
    message:'post deleted'
  })
}