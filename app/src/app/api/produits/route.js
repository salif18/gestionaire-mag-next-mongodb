// import db from "@/lib/db";
import { NextResponse } from "next/server";
import dbConnect from "../../lib/mongoosedb";
import Produits from "../models/produits";
import middlewareAuthenticate from "../middlewares/auth";
import { uploadMiddleware } from "../middlewares/multer";

//route pour ajouter


export const POST = async (req) => {
    try {
        // await new Promise((resolve, reject) => {
        //     uploadMiddleware(req, res, (err) => {
        //         if (err) reject(err);
        //         else resolve();
        //     });
        // });

        await dbConnect();
        await middlewareAuthenticate(req);

        const data = await req.json()
        console.log(data)
        const nouveauProduit = new Produits({ 
            ...data ,    
            // image: req.file ? req.file.path : null // Chemin de l'image sauvegardée
        });

        const produitSauvegarde = await nouveauProduit.save();

        return NextResponse.json({ message: "Produit ajouté", produitSauvegarde, }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ message: "Erreur", error: err.message }, { status: 500 });
    }
};

