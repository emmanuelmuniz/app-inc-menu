import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
    name_es: String,
    name_en: String,
    name_pt: String,
    _id: String
});

const productSchema = new Schema(
    {
        name_es: String,
        name_en: String,
        name_pt: String,
        price: Number,
        description_es: String,
        description_en: String,
        description_pt: String,
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
        const maxSequenceCategory = await Product.findOne().sort('-sequence').exec();
        this.sequence = maxSequenceCategory ? maxSequenceCategory.sequence + 1 : 1;
    }
    next();
});

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;