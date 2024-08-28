// import db from "@/lib/db";
import dbConnect from "../../lib/mongoosedb";
import { NextResponse } from "next/server";
import Vente from "../models/ventes"; // Assurez-vous d'avoir un modèle Vente
import Produits from "../models/produits";
import middlewareAuthenticate from "../middlewares/auth";

export const POST = async (req) => {
  const { userId,_id, nom, categories, prix_achat, prix_vente, stocks, qty, date_vente} = await req.json();
  console.log("ID du produit reçu:", _id); // Affichage du _id reçu depuis le client

  try {
      await dbConnect();
      await middlewareAuthenticate(req);

      // Trouver le produit associé à la vente
      const product = await Produits.findById(_id); // Pas besoin d'encapsuler _id dans un objet
      console.log("ID du produit trouvé:", product._id); // Afficher l'ID du produit trouvé

      if (!product) {
          return NextResponse.json(
              { message: 'Produit non trouvé' },
              { status: 404 }
          );
      }

      // Vérifier si le stock est suffisant
      if (qty > 0 && qty <= product.stocks) {
          // Créer la vente avec le productId assigné correctement
          const vente = new Vente({
              userId,
              productId: product._id, // Conversion en chaîne de caractères
              nom,
              categories,
              prix_achat,
              prix_vente,
              stocks,
              qty,
              date_vente: date_vente ? date_vente : new Date()
          });

          console.log("Objet Vente créé:", vente); // Afficher l'objet vente complet

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

