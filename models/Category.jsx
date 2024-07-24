import mongoose, { Schema } from "mongoose";

const sectionSchema = new Schema({
    section: String,
    _id: String,
});

const productSchema = new Schema({
    name_es: String,
    name_en: String,
    name_pt: String,
    description: String,
    price: Number,
    _id: String,
    sequence: Number,
    publish: Boolean
});


const categorySchema = new Schema(
    {
        name_es: String,
        name_en: String,
        name_pt: String,
        description: String,
        publish: Boolean,
        sequence: Number,
        lastUpdateUser: String,
        products: [productSchema]
    },
    {
        timestamps: true,
    }
);

categorySchema.pre('save', async function (next) {
    if (this.isNew) {
        const Category = mongoose.model('Category');
        const maxSequenceCategory = await Category.findOne().sort('-sequence').exec();
        this.sequence = maxSequenceCategory ? maxSequenceCategory.sequence + 1 : 1;
    }
    next();
});


const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;