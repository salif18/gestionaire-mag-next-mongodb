import dbConnect from "../../lib/mongoosedb";
import middlewareAuthenticate from "../middlewares/auth";
import Categories from "../models/categories"; // Assurez-vous d'avoir un modèle Depense
import { NextResponse } from "next/server";


export const POST = async (req) => {
    try {
        await dbConnect()
        await middlewareAuthenticate(req);
        const data = await req.json();
        console.log(data)
        // Créer une nouvelle dépense
        const nouvelleCategorie = new Categories({
          ...data
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
