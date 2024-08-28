import mongoose from "mongoose";

const schema = mongoose.Schema({
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Produits' },
        nom: { type: String },
        categories: { type: String },
        prix_achat: { type: Number },
        prix_vente: { type: Number },
        stocks: { type: Number },
        qty: { type: Number },
        date_vente: { type: Date }
    }, { timestamps: true });

const Ventes = mongoose.models.Ventes || mongoose.model("Ventes", schema);

export default Ventes;
