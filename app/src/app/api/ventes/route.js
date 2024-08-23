// import db from "@/lib/db";
import dbConnect from "../../lib/mongoosedb";
import { NextResponse } from "next/server";
import Vente from "../models/ventes"; // Assurez-vous d'avoir un modèle Vente
import Produits from "../models/produits";

export const POST = async (req) => {
    const { _id, nom, categories, prixAchat, prixVente, stocks, qty, timestamps } = await req.json();

    try {
      await dbConnect();
      // Trouver le produit associé à la vente
    const product = await Produits.findById({_id});

    if (!product) {
      return NextResponse.json(
        { message: 'Produit non trouvé' },
        { status: 404 }
      );
    }

    // Vérifier si le stock est suffisant
    if (qty > 0 && qty <= product.stocks) {
      // Créer la vente
      const vente = new Vente({ id:_id, nom, categories, prixAchat, prixVente, stocks, qty, timestamps });
      const savedVente = await vente.save();

      // Mettre à jour le stock du produit
      product.stocks -= qty;
      await product.save();

      return NextResponse.json(
        { message: 'Vente effectuée avec succès !!', results: savedVente },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: `Stock insuffisant pour le produit ${nom}` },
        { status: 400 }
      );
    }

    } catch (err) {
        return NextResponse.json(
            { message: 'Erreur lors de la sauvegarde de la vente', error: err },
            { status: 500 }
        );
    }
};

// Route pour obtenir toutes les ventes
export const GET = async (req, res) => {
    try {
      await dbConnect();
        const ventes = await Vente.find().sort({ timestamps: -1 });

        return NextResponse.json(
            { message: "ok", results: ventes },
            { status: 200 }
        );
    } catch (err) {
        return NextResponse.json(
            { message: "Erreur lors de la récupération des ventes", error: err },
            { status: 500 }
        );
    }
};

