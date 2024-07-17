import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
    category: String,
    _id: String,
    sequence: String
});

const sectionSchema = new Schema(
    {
        name_es: String,
        name_en: String,
        name_pt: String,
        categories: [categorySchema],
        description: String,
        publish: Boolean,
        sequence: Number,
        lastUpdateUser: String
    },
    {
        timestamps: true,
    }
);

sectionSchema.pre('save', async function (next) {
    if (this.isNew) {
        const Section = mongoose.model('Section');
        const maxSequenceSection = await Section.findOne().sort('-sequence').exec();
        this.section = maxSequenceSection ? maxSequenceSection.sequence + 1 : 1;
    }
    next();
});


const Section = mongoose.models.Section || mongoose.model("Section", sectionSchema);

export default Section;