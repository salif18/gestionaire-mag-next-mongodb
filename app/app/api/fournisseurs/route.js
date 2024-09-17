// import db from "@/lib/db";
import { NextResponse } from "next/server";
import dbConnect from "../../lib/mongoosedb";
import Fournisseurs from "../models/fournisseurs";
import middlewareAuthenticate from "../middlewares/auth";
//route pour ajouter


export const POST = async (req) => {
    try {
        await dbConnect();
        await middlewareAuthenticate(req);

        const data = await req.json();

        const nouveauFournisseur = new Fournisseurs({ ...data });

        const fournisseurSauvegarde = await nouveauFournisseur.save();
       
        return NextResponse.json({ message: "Ajouté", fournisseurSauvegarde , }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ message: "Erreur", error: err.message }, { status: 500 });
    }
};

