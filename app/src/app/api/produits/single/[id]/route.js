import dbConnect from "../../../../lib/mongoosedb";
import { NextResponse } from "next/server";
import Produit from "../../../models/produits"; // Assurez-vous d'avoir un modèle Produit
import middlewareAuthenticate from "../../../middlewares/auth";

export const GET = async (req) => {
  try {
    await dbConnect()
    await middlewareAuthenticate(req);
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop(); 
   
    const produit = await Produit.findById(id);

    if (!produit) {
      return NextResponse.json({ message: 'Produit non trouvé' }, { status: 404 });
    }

    return NextResponse.json({ message: 'ok', results: produit }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};


export const PUT = async (req) => {
  try {
    await dbConnect();
    await middlewareAuthenticate(req);
    // Extraction de l'ID du produit depuis l'URL
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop(); 

    if (!id) {
      return NextResponse.json({ message: 'ID du produit manquant' }, { status: 400 });
    }

    const { nom, categories, prix_achat, prix_vente, stocks } = await req.json();

    // Trouver le produit existant
    const produit = await Produit.findById(id);
    console.log(produit)

    if (!produit) {
      return NextResponse.json({ message: 'Produit non trouvé' }, { status: 404 });
    }

    // Mise à jour du produit avec les nouvelles valeurs
    const produitMisAJour = await Produit.findByIdAndUpdate(
      id,
      {
        nom: nom.length > 0 ? nom : produit.nom,
        categories: categories.length > 0 ? categories : produit.categories,
        prix_achat: prix_achat.length > 0 ? prix_achat : produit.prix_achat,
        prix_vente: prix_vente.length > 0 ? prix_vente : produit.prix_vente,
        stocks: stocks.length > 0 ? stocks : produit.stocks
      },
      { new: true } // retourne le document mis à jour
    );

    return NextResponse.json(
      { message: 'Produit modifié avec succès !!', results: produitMisAJour },
      { status: 200 }
    );

  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};

export const PATCH = async (req) => {
  try {
    await dbConnect()
    await middlewareAuthenticate(req);
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop(); 
    const { stocks } = await req.json();

    const produit = await Produit.findByIdAndUpdate(
      id,
      { stocks },
      { new: true } // retourne le document mis à jour
    );

    if (!produit) {
      return NextResponse.json({ message: 'Produit non trouvé' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Stock modifié avec succès !!', results: produit }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};

export const DELETE = async (req) => {
  try {
    await dbConnect()
    await middlewareAuthenticate(req);
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop(); 
    const produit = await Produit.findByIdAndDelete(id);

    if (!produit) {
      return NextResponse.json({ message: 'Produit non trouvé' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Le produit a été supprimé avec succès !!', results: produit }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};
