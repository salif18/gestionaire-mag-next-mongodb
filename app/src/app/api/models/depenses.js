import mongoose from "mongoose";

const schema = mongoose.Schema({
    montants: { type: Number, required: true },
    motifs: { type: String, required: true },
}, { timestamps: true });

const Depenses = mongoose.models.Depenses || mongoose.model("Depenses", schema);

export default Depenses;