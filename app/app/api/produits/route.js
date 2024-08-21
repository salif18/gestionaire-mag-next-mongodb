// import db from "@/lib/db";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoosedb";
import Produits from "../models/produits";
//route pour ajouter


export const POST = async (req) => {
    try {
        await dbConnect();

        const { nom, categories, prixAchat, prixVente, stocks, dateAchat } = await req.json();

        const nouveauProduit = new Produits({ nom,categories,prixAchat,prixVente,stocks,dateAchat});

        const produitSauvegarde = await nouveauProduit.save();

        return NextResponse.json({ message: "Produit ajouté", produitSauvegarde }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ message: "Erreur", error: err.message }, { status: 500 });
    }
};

export const GET = async () => {
  try {
      await dbConnect();

      const produits = await Produits.find().sort({ dateAchat: -1 });

      return NextResponse.json({ message: "OK", produits }, { status: 200 });
  } catch (err) {
      return NextResponse.json({ message: "Erreur", error: err.message }, { status: 500 });
  }
};

// export const POST = async (req) => {
//   try {
//     //const { matieres, classes, observation } = await req.json();
//     const { nom, categories, prixAchat, prixVente, stocks, dateAchat } = await req.json();
//     const produits = [ nom, categories, prixAchat, prixVente, stocks, dateAchat ]

//     const sql = "INSERT INTO produits SET ?";
//     const results = await new Promise((resolve, reject) => {
//       db.query(sql, produits, (err, result) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(result);
//         }
//       });
//     });
//     return NextResponse.json({ message: "Ajouté", results }, { status: 201 });
//   } catch (err) {
//     return NextResponse.json(
//       { message: "Erreur", error: err },
//       { status: 500 }
//     );
//   }
// };

// //route pour obtenir tous
// export const GET = async (req, res) => {
//   try {
//     const sql = "SELECT * FROM produits ORDER BY dateAchat DESC ";
//     const results = await new Promise((resolve, reject) => {
//       db.query(sql, (err, result) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(result);
//         }
//       });
//     });
    
//     return NextResponse.json({ message: "ok", results }, { status: 200 });
//   } catch (err) {
//     return NextResponse.json({ message: "err" }, { status: 500 });
//   }
// };
