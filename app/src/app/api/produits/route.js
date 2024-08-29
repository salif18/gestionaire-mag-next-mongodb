import { NextResponse } from "next/server";
import dbConnect from "../../lib/mongoosedb";
import Produits from "../models/produits";
import middlewareAuthenticate from "../middlewares/auth";
import multer from "multer";
import path from "path";

// Extensions MIME
const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
};

// Configuration de stockage pour multer
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(process.cwd(),"/public/images"));
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(" ").join("_");
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + "." + extension);
    }
});

// Middleware d'upload pour un seul fichier image
const upload = multer({ storage }).single('image');

// Fonction pour traiter l'upload de fichier
async function handleUpload(req) {
    return new Promise((resolve, reject) => {
        upload(req, null, (err) => {
            if (err) {
                console.error('Erreur lors du téléchargement du fichier:', err);
                reject(err);
            } else {
                console.log('Fichier téléchargé avec succès:', req.file);
                resolve();
            }
        });
    });
}

export const POST = async (req) => {
    try {
        console.log('Début de la requête POST');
        
        // Connexion à la base de données
        await dbConnect();
        console.log('Connexion à la base de données réussie');

        // Authentification
        await middlewareAuthenticate(req);
        console.log('Authentification réussie, utilisateur:', req.auth.userId);
        
        // Traitement de l'upload
        await handleUpload(req);

        // Vérification de l'objet file
        console.log('Fichier après upload:', req.file);

        // Lecture des données de la requête
        const formData = await req.formData();
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        console.log('Données de la requête:', data);
        
        // Création d'un nouvel objet produit
        const nouveauProduit = new Produits({
            ...data,
            image: req.file ? req.file.path : null, // Chemin de l'image uploadée
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
