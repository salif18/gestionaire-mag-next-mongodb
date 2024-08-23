import dbConnect from "../../../lib/mongoosedb";
// Assurez-vous d'avoir un modèle Vente
import { NextResponse } from "next/server";
import Vente from "../../models/ventes"; 
import Produits from "../../models/produits";


export const DELETE = async (req) => {
    try {
        await dbConnect();

        // Récupérer l'ID de la vente à partir de l'URL
        const id = req.url.split('ventes/')[1];

        // Trouver la vente par ID
        const vente = await Vente.findById(id);

        if (!vente) {
            return NextResponse.json({ message: 'Vente non trouvée' }, { status: 404 });
        }

        // Trouver le produit associé à la vente
        const product = await Produits.findById(vente._id); 

        if (!product) {
            return NextResponse.json({ message: 'Produit non trouvé' }, { status: 404 });
        }

        // Mettre à jour le stock du produit en ajoutant la quantité annulée
        product.stocks += vente.qty;
        await product.save();

        // Supprimer la vente
        await vente.deleteOne();

        return NextResponse.json(
            { message: 'La vente a été annulée avec succès !!', results: vente },
            { status: 200 }
        );

    } catch (err) {
        return NextResponse.json(
            { message: 'Erreur lors de l\'annulation de la vente', error: err.message },
            { status: 500 }
        );
    }
};
