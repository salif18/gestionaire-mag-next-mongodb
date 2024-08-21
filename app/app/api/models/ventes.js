import mongoose from "mongoose";

const schema = mongoose.Schema({
        id:{type:mongoose.Types.ObjectId},
        nom:{type:String},
        categories:{type:String},
        prixAchat:{type:Number},
        prixVente:{type:Number},
        stocks:{type:Number},
        qty:{type:Number},
        timestamps:{type:Date}
}, { timestamps: true });

const Ventes = mongoose.models.Ventes || mongoose.model("Ventes", schema);

export default Ventes;
