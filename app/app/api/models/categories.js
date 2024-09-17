import mongoose from "mongoose";

const schema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    name: { type: String, required: true },
}, { timestamps: true });

const Categories = mongoose.models.Categories || mongoose.model("Categories", schema);

export default Categories;