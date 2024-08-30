import { NextResponse } from "next/server";
import dbConnect from "../../lib/mongoosedb";
import Produits from "../models/produits";
import middlewareAuthenticate from "../middlewares/auth";
import { Buffer } from 'buffer';

export const POST = async (req) => {
    try {
        console.log('Début de la requête POST');
        
        // Connexion à la base de données
        await dbConnect();
        console.log('Connexion à la base de données réussie');

        // Authentification
        await middlewareAuthenticate(req);
        console.log('Authentification réussie, utilisateur:', req.auth.userId);
        
        // Lecture des données de la requête
        const formData = await req.formData();
        console.log("corps de la requete", formData)
        const file = formData.get("image")

        if(!file){
            console.log("pas de fichier")
        }

        const bufferData = await file.arrayBuffer();
        const buffer = Buffer.from(bufferData)

        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        console.log('Données de la requête:', data);
        
        // Création d'un nouvel objet produit
        const nouveauProduit = new Produits({
            ...data,
            image:buffer,
            userId: req.auth.userId // Associer le produit à l'utilisateur
        });

        // Sauvegarde du produit dans la base de données
        const produitSauvegarde = await nouveauProduit.save();
        console.log('Produit sauvegardé avec succès:', produitSauvegarde);

        // Retourner une réponse avec le produit sauvegardé
        return NextResponse.json({ message: "Produit ajouté", produitSauvegarde }, { status: 201 });
    } catch (err) {
        console.error('Erreur pendant la requête POST:', err.message);
        return NextResponse.json({ message: "Erreur", error: err.message }, { status: 500 });
    }
};
