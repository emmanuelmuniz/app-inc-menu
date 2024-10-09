import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
    name_es: String,
    name_en: String,
    name_pt: String,
    _id: String
});

const productSchema = new Schema(
    {
        name_es: {
            type: String,
            required: true
        },
        name_en: {
            type: String,
            required: false
        },
        name_pt: {
            type: String,
            required: false
        },
        price: {
            type: Number,
            required: true
        },
        description_es: {
            type: String,
            required: true
        },
        description_en: {
            type: String,
            required: false
        },
        description_pt: {
            type: String,
            required: false
        },
        active: {
            type: Boolean,
            required: true
        },
        sequence: {
            type: Number
        },
        category: categorySchema,
        lastUpdateUser: {
            type: String
        }
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