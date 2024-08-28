// import db from "@/lib/db";
import dbConnect from "../../../lib/mongoosedb";
import { NextResponse } from "next/server";
import Vente from "../../models/ventes"; // Assurez-vous d'avoir un modèle Vente
import middlewareAuthenticate from "../../middlewares/auth";

// Route pour obtenir toutes les ventes
export const GET = async (req, res) => {
    try {
        await dbConnect();
        //VERIFICATION DES ROUTES MIDDLEWARE POUR AUTHENCITE DE USER
        await middlewareAuthenticate(req);
        const url = new URL(req.url);
        const userId = url.pathname.split('/').pop();

        if (!userId) {
            return NextResponse.json(
                { message: 'userId est requis' },
                { status: 400 }
            );
        }
        //   RECUPERER LES VENTES
        const ventes = await Vente.find({ userId }).sort({ date_vente: -1 });

        // CALCULE DES SOMMES
        const totalAchat = ventes.map((x) => x.prix_achat * x.qty).reduce((a, b) => a + b, 0);
        const totalVente = ventes.map((x) => x.prix_vente * x.qty).reduce((a, b) => a + b, 0);

        // CALCULE DE BENEFICE
        const beneficeTotal = ventes.reduce((acc, x) => {
            return acc + ((x.prix_vente - x.prix_achat) * x.qty);
        }, 0);


        return NextResponse.json(
            {
                message: "ok",
                results: ventes,
                total_vente: totalVente,
                benefice_total: beneficeTotal,
                totalAchatOfVente: totalAchat
            },
            { status: 200 }
        );
    } catch (err) {
        return NextResponse.json(
            { message: "Erreur lors de la récupération des ventes", error: err },
            { status: 500 }
        );
    }
};