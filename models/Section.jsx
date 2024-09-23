import mongoose, { Schema } from "mongoose";

const sectionSchema = new Schema(
    {
        name_es: String,
        name_en: String,
        name_pt: String,
        description_es: String,
        description_en: String,
        description_pt: String,
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
        this.sequence = maxSequenceSection ? maxSequenceSection.sequence + 1 : 1;
    }
    next();
});

const Section = mongoose.models.Section || mongoose.model("Section", sectionSchema);

export default Section;