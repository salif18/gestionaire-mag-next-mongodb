import dbConnect from "../../../lib/mongoosedb";
import middlewareAuthenticate from "../../middlewares/auth";
import Categories from "../../models/categories"; // Assurez-vous d'avoir un modèle Depense
import { NextResponse } from "next/server";



export const GET = async (req) => {
    try {
        await dbConnect()
        await middlewareAuthenticate(req);

         // Utilisation de l'URL pour récupérer le paramètre userId
         const url = new URL(req.url);
         const userId = url.pathname.split('/').pop(); // Extraire userId de l'URL
       
 
        if (!userId) {
            return NextResponse.json(
                { message: 'userId est requis' },
                { status: 400 }
            );
        }

        // Récupérer les catégories selon le userId
        const results = await Categories.find({ userId }).sort({ name: 1 });
        
        // Récupérer toutes les dépenses triées par date de création décroissante
        // const results = await Categories.find().sort({ name: -1 });

        return NextResponse.json(
            { message: 'ok', results },
            { status: 200 }
        );
    } catch (err) {
        return NextResponse.json(
            { message: 'Une erreur s\'est produite', error: err.message },
            { status: 500 }
        );
    }
}