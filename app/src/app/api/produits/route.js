// import db from "@/lib/db";
import { NextResponse } from "next/server";
import dbConnect from "../../lib/mongoosedb";
import Produits from "../models/produits";
//route pour ajouter


export const POST = async (req) => {
    try {
        await dbConnect();

        const { nom, categories, prixAchat, prixVente, stocks, dateAchat } = await req.json();

        const nouveauProduit = new Produits({ nom,categories,prixAchat,prixVente,stocks,dateAchat});

        const produitSauvegarde = await nouveauProduit.save();
       
        return NextResponse.json({ message: "Produit ajouté", produitSauvegarde , }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ message: "Erreur", error: err.message }, { status: 500 });
    }
};

export const GET = async () => {
  try {
      await dbConnect();

      const produits = await Produits.find().sort({ dateAchat: -1 });
      const totalAchat = produits.map((x) => x.prixAchat * x.stocks).reduce((a, b) => a + b, 0);
      return NextResponse.json({ message: "OK", produits , totalAchatOfAchat:totalAchat }, { status: 200 });
  } catch (err) {
      return NextResponse.json({ message: "Erreur", error: err.message }, { status: 500 });
  }
};
