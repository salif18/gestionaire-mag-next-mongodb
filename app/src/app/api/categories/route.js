import dbConnect from "../../lib/mongoosedb";
import middlewareAuthenticate from "../middlewares/auth";
import Categories from "../models/categories"; // Assurez-vous d'avoir un modèle Depense
import { NextResponse } from "next/server";


export const POST = async (req) => {
    try {
        await dbConnect()
        await middlewareAuthenticate(req);
        const {userId, name } = await req.json();

        // Créer une nouvelle dépense
        const nouvelleCategorie = new Categories({
          userId,
           name:name
        });

        // Sauvegarder dans la base de données
        const results = await nouvelleCategorie.save();

        return NextResponse.json(
            { message: 'Ajouté !!', results },
            { status: 201 }
        );
    } catch (err) {
        return NextResponse.json(
            { message: err.message },
            { status: 500 }
        );
    }
}
