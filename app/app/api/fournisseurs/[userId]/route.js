import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongoosedb";
import Fournisseurs from "../../models/fournisseurs";
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
  
        const fournisseurs = await Fournisseurs.find({userId}).sort({ nom: -1 });
       
        return NextResponse.json({ message: "OK", fournisseurs }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Erreur", error: err.message }, { status: 500 });
    }
  };
  