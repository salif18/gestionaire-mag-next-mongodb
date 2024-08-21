import mongoose from "mongoose";

const schema = mongoose.Schema({
    nom: { type: String, required: true },
    categories: { type: String, required: true },
    prixAchat: { type: Number, required: true },
    prixVente: { type: Number, required: true },
    stocks: { type: Number, required: true },
    dateAchat: { type: Date, required: true },
}, { timestamps: true });

const Produits = mongoose.models.Produits || mongoose.model("Produits", schema);

export default Produits;
