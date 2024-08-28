import dbConnect from "../../../../lib/mongoosedb";
import Vente from "../../../models/ventes"; // Assurez-vous d'avoir un modèle Vente
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export const GET = async (req) => {
    try {
        await dbConnect()
        const url = new URL(req.url);
        const userId = url.pathname.split('/').pop();

        if (!userId) {
            return NextResponse.json(
                { message: 'userId est requis' },
                { status: 400 }
            );
        }
        const results = await Vente.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId) } },
            {
                $group: {
                    _id: { nom: "$nom", categories: "$categories" },
                    total_vendu: { $sum: "$qty" }
                }
            },
            {
                $sort: { total_vendu: -1 } // Trier par total_vendu en ordre décroissant
            }
        ]);

        return NextResponse.json(
            { message: 'ok', results },
            { status: 200 }
        );
    } catch (err) {
        return NextResponse.json(
            { error: 'Une erreur s\'est produite lors de la récupération des statistiques de vente.', message: err.message },
            { status: 500 }
        );
    }
};


