import mongoose, { Schema } from "mongoose";

const sectionSchema = new Schema({
    name_es: String,
    name_en: String,
    name_pt: String,
    _id: String,
});

const categorySchema = new Schema(
    {
        name_es: String,
        name_en: String,
        name_pt: String,
        description_es: String,
        description_en: String,
        description_pt: String,
        active: Boolean,
        sequence: Number,
        lastUpdateUser: String,
        section: sectionSchema
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