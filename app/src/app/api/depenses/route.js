import dbConnect from "../../lib/mongoosedb";
import middlewareAuthenticate from "../middlewares/auth";
import Depense from "../models/depenses"; // Assurez-vous d'avoir un modèle Depense
import { NextResponse } from "next/server";


export const POST = async (req) => {
    try {
        await dbConnect()
        await middlewareAuthenticate(req);
        const { userId, montants, motifs} = await req.json();

        // Créer une nouvelle dépense
        const nouvelleDepense = new Depense({
            userId,
            montants: montants,
            motifs: motifs,
        });

        // Sauvegarder dans la base de données
        const results = await nouvelleDepense.save();

        return NextResponse.json(
            { message: 'Ajoutée !!', results },
            { status: 201 }
        );
    } catch (err) {
        return NextResponse.json(
            { message: err.message },
            { status: 500 }
        );
    }
}
