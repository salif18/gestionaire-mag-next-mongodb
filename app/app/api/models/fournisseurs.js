import mongoose from "mongoose";

const schema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    prenom: { type: String, required: true },
    nom: { type: String, required: true },
    numero: { type: Number, required: true },
    address: { type: String, required: true },
    produit: { type: String, required: true },
    
}, { timestamps: true });

const Fournisseurs = mongoose.models.Fournisseurs || mongoose.model("Fournisseurs", schema);

export default Fournisseurs;
