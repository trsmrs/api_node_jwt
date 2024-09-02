import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET;

const auth = (req, res, next) => {
    const token =  req.headers.authorization
  
  
    if(!token){
        return res.status(401).json({message: "Não autorizado"})
    }

    try {

        const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET)
        // const decoded = jwt.verify(token(JWT_SECRET))
        console.log(decoded)

    } catch(err){
        console.log(err)
        return res.status(401).json({message: "Token inválido"})
    }

    next()
}

export default auth;