import dbConnect from "../../../lib/mongoosedb";
import middlewareAuthenticate from "../../middlewares/auth";
import Depense from "../../models/depenses"; // Assurez-vous d'avoir un modèle Depense
import { NextResponse } from "next/server";



export const GET = async (req) => {
    try {
        await dbConnect()
        await middlewareAuthenticate(req);
        const url = new URL(req.url);
        const userId = url.pathname.split('/').pop();

        if (!userId) {
            return NextResponse.json(
                { message: 'userId est requis' },
                { status: 400 }
            );
        }
        // Récupérer toutes les dépenses triées par date de création décroissante
        const results = await Depense.find({ userId }).sort({ timestamps: -1 });

        // Calcul des dépenses
        const depensesTotal = results.reduce((total, depense) => total + depense.montants, 0);

        return NextResponse.json(
            { message: 'ok', results, depensesTotal },
            { status: 200 }
        );
    } catch (err) {
        return NextResponse.json(
            { message: 'Une erreur s\'est produite', error: err.message },
            { status: 500 }
        );
    }
}