import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
    name_es: String,
    name_en: String,
    name_pt: String,
    _id: String,
    sequence: Number
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

const Section = mongoose.models.Section || mongoose.model("Section", sectionSchema);

export default Section;