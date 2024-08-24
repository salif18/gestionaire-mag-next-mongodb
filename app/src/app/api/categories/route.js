import dbConnect from "../../lib/mongoosedb";
import Categories from "../models/categories"; // Assurez-vous d'avoir un modèle Depense
import { NextResponse } from "next/server";


export const POST = async (req) => {
    try {
        await dbConnect()
        const { name } = await req.json();

        // Créer une nouvelle dépense
        const nouvelleCategorie = new Categories({
           name:name
        });

        // Sauvegarder dans la base de données
        const results = await nouvelleCategorie.save();

        return NextResponse.json(
            { message: 'Categories enregistrée avec succès !!', results },
            { status: 201 }
        );
    } catch (err) {
        return NextResponse.json(
            { message: err.message },
            { status: 500 }
        );
    }
}


export const GET = async (req) => {
    try {
        await dbConnect()
        // Récupérer toutes les dépenses triées par date de création décroissante
        const results = await Categories.find().sort({ name: -1 });

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