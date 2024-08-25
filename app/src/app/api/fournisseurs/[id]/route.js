import dbConnect from "../../../lib/mongoosedb";
import Fournisseurs from "../../models/fournisseurs"; // Assurez-vous d'avoir un modèle Depense
import { NextResponse } from "next/server";

export const DELETE = async (req) => {
    try {
      await dbConnect()
      const id = req.url.split('fournisseurs/')[1];
      const fournisseur = await Fournisseurs.findByIdAndDelete(id);
  
      if (!fournisseur) {
        return NextResponse.json({ message: 'fournisseur non trouvé' }, { status: 404 });
      }
  
      return NextResponse.json({ message: 'Le fournisseur a été supprimé avec succès !!', results: produit }, { status: 200 });
    } catch (err) {
      return NextResponse.json({ message: err.message }, { status: 500 });
    }
  };