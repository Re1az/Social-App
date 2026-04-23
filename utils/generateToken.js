import jwt from "jsonwebtoken";

const generateToken=(id,res,req)=>{
  const token=jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'30d'})
  res.cookie('jwt',token,{httpOnly:true,maxAge:30*24*60*60*1000,
  sameSite: 'lax',
  secure: false,
  })

  // return token
}

export default generateToken;