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
                    _id: {
                        annee: { $year: "$date_vente" },
                        mois: { $month: "$date_vente" }
                    },
                    nombre_ventes: { $sum: 1 },
                    total_ventes: { $sum: { $multiply: ["$prix_vente", "$qty"] } }
                }
            },
            {
                $sort: { "_id.annee": 1, "_id.mois": 1 }
            },
            {
                $project: {
                    _id: 0,
                    annee: "$_id.annee",
                    mois: "$_id.mois",
                    nombre_ventes: 1,
                    total_ventes: 1
                }
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
