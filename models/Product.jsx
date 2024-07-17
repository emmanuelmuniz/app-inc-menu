import mongoose, { Schema } from "mongoose";

// const categorySchema = new Schema({
//     category: String,
//     _id: String,
// });

const productSchema = new Schema(
    {
        name_es: String,
        name_en: String,
        name_pt: String,
        price: Number,
        description: String,
        publish: Boolean,
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;