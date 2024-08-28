import dbConnect from "../../../../lib/mongoosedb";
import middlewareAuthenticate from "../../../middlewares/auth";
import Categories from "../../../models/categories"; // Assurez-vous d'avoir un modèle Depense
import { NextResponse } from "next/server";

export const DELETE = async (req) => {
    try {
      await dbConnect()
      await middlewareAuthenticate(req);
      const url = new URL(req.url);
      const id = url.pathname.split('/').pop(); 
      const categorie = await Categories.findByIdAndDelete(id);
  
      if (!categorie) {
        return NextResponse.json({ message: 'Categorie non trouvé' }, { status: 404 });
      }
  
      return NextResponse.json({ message: 'Le categorie a été supprimé avec succès !!', results: produit }, { status: 200 });
    } catch (err) {
      return NextResponse.json({ message: err.message }, { status: 500 });
    }
  };