import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { SECRET_KEY } = process.env;

function validateToken(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Token not provided.' });
  }

  jwt.verify(token, SECRET_KEY, (error, decodedToken) => {
    if (error) {
      console.log(error);
      return res.status(401).json({ message: 'Invalid Token.' });
    }
    
    req.usuarioId = decodedToken.id;
    return next();
  });
}

export default validateToken;
