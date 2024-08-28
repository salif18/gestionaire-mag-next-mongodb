// import db from "@/lib/db";
import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongoosedb";
import Produits from "../../models/produits";
import middlewareAuthenticate from "../../middlewares/auth";
//route pour ajouter


export const GET = async (req) => {
    try {
        await dbConnect();
        await middlewareAuthenticate(req);
        const url = new URL(req.url);
        const userId = url.pathname.split('/').pop(); 

        if (!userId) {
            return NextResponse.json(
                { message: 'userId est requis' },
                { status: 400 }
            );
        }
  
  
        const produits = await Produits.find({userId}).sort({ date_achat: -1 });
        const totalAchat = produits.map((x) => x.prix_achat * x.stocks).reduce((a, b) => a + b, 0);
        return NextResponse.json({ message: "OK", produits , totalAchatOfAchat:totalAchat }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Erreur", error: err.message }, { status: 500 });
    }
  };