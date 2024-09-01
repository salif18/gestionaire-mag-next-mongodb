import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import Users from "../models/user"
import { NextResponse } from "next/server";
import dbConnect from "../../lib/mongoosedb";
import { config as configDotenv } from "dotenv";
configDotenv();


// Durée de blocage en millisecondes (1 heure)
const BLOCK_DURATION = 5 * 60 * 1000;

// Nombre maximal de tentatives
const TENTATIVES_MAX = 5;


// FONCTION DE CONNEXION DES UTILISATEURS
export const POST = async (req) => {
    try {
      await dbConnect();
      const { contacts, password } = await req.json();
     console.log(contacts)
     console.log(password)
      const user = await Users.findOne({
        $or: [
          { numero: contacts },
          { email: contacts }
        ]
      }); // Assurez-vous que 'photo' est correct
  
      if (!user) {
        return NextResponse.json({  message: "Votre email ou numéro est incorrect"},{status:400});
      }
      
  
      // Vérifier si l'utilisateur  a atteint le nombre maximum de tentatives et le bloqué
      if (user.tentatives >= TENTATIVES_MAX && user.tentativesExpires > Date.now()) {
        // Convertir 'tentativesExpires' en heure locale
        const tempsDattente = new Date(user.tentativesExpires).toLocaleString();
        return NextResponse.json({
          message: `Nombre maximal de tentatives atteint. Veuillez réessayer après ${tempsDattente.split(" ")[1]}.`
        },{status:429});
      }
  
      const validPassword = await bcrypt.compare(password, user.password);
  
      if (!validPassword) {
        // Incrémenter les tentatives
        user.tentatives += 1;  
        if (user.tentatives >= TENTATIVES_MAX) {
          // Définir l'expiration si les tentatives maximales sont atteintes
          user.tentativesExpires = Date.now() + BLOCK_DURATION;  
        }
        await user.save();
        return NextResponse.json({
          message: "Votre mot de passe est incorrect"
        },{status:401});
      }
      // Réinitialiser les tentatives en cas de succès
      user.tentatives = 0;  
      // Réinitialiser l'expiration
      user.tentativesExpires = Date.now();  
  
      const token = jwt.sign(
        { userId: user._id },
        process.env.SECRET_KEY,
        { expiresIn: "24h" }
      );
  
      await user.save();
  
      return NextResponse.json({
        token: token,
        userId: user._id,
        userName:user.name,
        message:"user connecté"
      },{status:200});
  
    } catch (error) {
      return NextResponse.json({
        error: error.message
      },{status:500});
    }
  }