import { config as configDotenv } from 'dotenv';
import jwt from 'jsonwebtoken';

configDotenv();

const middlewareAuthenticate = async (req) => {
  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
        console.log('authorization manquant')
      throw new Error('Token manquant');
      
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        console.log('Token manquant')
      throw new Error('Token manquant');
    }

    const verifyAndDecoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = verifyAndDecoded.userId;

    // Ajouter userId à l'objet req pour une utilisation ultérieure
    req.auth = { userId };
  } catch (err) {
    throw new Error('Token invalide ou expiré');
  }
};

export default middlewareAuthenticate;
