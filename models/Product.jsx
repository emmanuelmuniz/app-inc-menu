import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
    category: String,
    _id: String,
});

const productSchema = new Schema(
    {
        name_es: String,
        name_en: String,
        name_pt: String,
        price: Number,
        description: String,
        publish: Boolean,
        sequence: Number,
        category: categorySchema,
        lastUpdateUser: String
    },
    {
        timestamps: true,
    }
);

productSchema.pre('save', async function (next) {
    if (this.isNew) {
        const Product = mongoose.model('Product');
        const maxSequenceProduct = await Product.findOne().sort('-sequence').exec();
        this.product = maxSequenceProduct ? maxSequenceProduct.sequence + 1 : 1;
    }
    next();
});

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;