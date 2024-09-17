import mongoose from "mongoose";

const schema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    montants: { type: Number, required: true },
    motifs: { type: String, required: true },
}, { timestamps: true });

const Depenses = mongoose.models.Depenses || mongoose.model("Depenses", schema);

export default Depenses;