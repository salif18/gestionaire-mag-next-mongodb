import mongoose from "mongoose";

const schema = mongoose.Schema({
    name: { type: String, required: true },
}, { timestamps: true });

const Categories = mongoose.models.Categories || mongoose.model("Categories", schema);

export default Categories;