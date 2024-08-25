// import db from "@/lib/db";
import { NextResponse } from "next/server";
import dbConnect from "../../lib/mongoosedb";
import Fournisseurs from "../models/fournisseurs";
//route pour ajouter


export const POST = async (req) => {
    try {
        await dbConnect();

        const { nom,prenom,numero,address,produit} = await req.json();

        const nouveauFournisseur = new Fournisseurs({ nom,prenom,numero,address,produit});

        const fournisseurSauvegarde = await nouveauFournisseur.save();
       
        return NextResponse.json({ message: "Produit ajouté", fournisseurSauvegarde , }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ message: "Erreur", error: err.message }, { status: 500 });
    }
};


export const GET = async () => {
    try {
        await dbConnect();
  
        const fournisseurs = await Fournisseurs.find().sort({ nom: -1 });
       
        return NextResponse.json({ message: "OK", fournisseurs }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Erreur", error: err.message }, { status: 500 });
    }
  };
  