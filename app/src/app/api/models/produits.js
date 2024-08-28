import mongoose from "mongoose";

const schema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    nom: { type: String, required: true },
    categories: { type: String, required: true },
    prix_achat: { type: Number, required: true },
    prix_vente: { type: Number, required: true },
    stocks: { type: Number, required: true },
    date_achat: { type: Date, required: true },
}, { timestamps: true });

const Produits = mongoose.models.Produits || mongoose.model("Produits", schema);

export default Produits;
