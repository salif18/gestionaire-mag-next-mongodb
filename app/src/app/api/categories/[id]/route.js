import dbConnect from "../../../lib/mongoosedb";
import Categories from "../../models/categories"; // Assurez-vous d'avoir un modèle Depense
import { NextResponse } from "next/server";

export const DELETE = async (req) => {
    try {
      await dbConnect()
      const id = req.url.split('categories/')[1];
      const categorie = await Categories.findByIdAndDelete(id);
  
      if (!categorie) {
        return NextResponse.json({ message: 'Categorie non trouvé' }, { status: 404 });
      }
  
      return NextResponse.json({ message: 'Le categorie a été supprimé avec succès !!', results: produit }, { status: 200 });
    } catch (err) {
      return NextResponse.json({ message: err.message }, { status: 500 });
    }
  };