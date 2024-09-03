require("dotenv").config();
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import Users from "../models/user"
import { NextResponse } from "next/server";
import dbConnect from "../../lib/mongoosedb";
import { config as configDotenv } from "dotenv";
configDotenv();

//FONCTION D'ENREGISTREMENT DES UTILISATEURS
export const POST = async (req, res) => {
  try {
    await dbConnect();
    const { name , boutique_name , numero, email, password } = await req.json();

    // Vérifiez si l'utilisateur existe
    const userExiste = await Users.findOne({
      $or: [
        { numero: numero },
        { email: email }
      ]
    });

    if (userExiste) {
      return NextResponse.json({
        message: "User existe"
      },{status:401});
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un instance du model user
    const user = new Users({name,  boutique_name, numero , email,password: hashedPassword});

    console.log(user)

    // Enregistrer l'utilisateur
    await user.save();

    // Créer un token JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.SECRET_KEY,
      { expiresIn: "24h" }
    );

    // Envoyer la réponse
    return NextResponse.json({
      token: token,
      userId: user._id,
      userName:user.name,
      entreprise:user.boutique_name,
      message:"user creer"
    },{status:201});
  } catch (error) {
    NextResponse.json({error},{status:500});
  }
};

