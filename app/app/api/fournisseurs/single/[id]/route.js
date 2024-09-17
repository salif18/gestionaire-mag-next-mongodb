import dbConnect from "../../../../lib/mongoosedb";
import middlewareAuthenticate from "../../../middlewares/auth";
import Fournisseurs from "../../../models/fournisseurs"; // Assurez-vous d'avoir un modèle Depense
import { NextResponse } from "next/server";

export const DELETE = async (req) => {
    try {
      await dbConnect()
      await middlewareAuthenticate(req);
      const url = new URL(req.url);
      const id = url.pathname.split('/').pop(); 
      const fournisseur = await Fournisseurs.findByIdAndDelete(id);
  
      if (!fournisseur) {
        return NextResponse.json({ message: 'fournisseur non trouvé' }, { status: 404 });
      }
  
      return NextResponse.json({ message: 'Supprimé !!', results: produit }, { status: 200 });
    } catch (err) {
      return NextResponse.json({ message: err.message }, { status: 500 });
    }
  };