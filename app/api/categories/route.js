import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import Category from "@/models/Category"

export async function POST(req) {
    let { name_es, name_en, name_pt, description_es, description_en, description_pt, publish, section } = await req.json();

    let category = {
        name_es: name_es,
        name_en: name_en,
        name_pt: name_pt,
        description_es: description_es,
        description_en: description_en,
        description_pt: description_pt,
        publish: publish,
        section: section
    }

    await connectMongoDB();
    await Category.create(category);
    return NextResponse.json({ message: "Category created" }, { status: 201 });
}

export async function GET(req) {
    await connectMongoDB();
    const categories = await Category.find().sort({ sequence: 1 });
    return NextResponse.json({ categories });
}

export async function DELETE(req) {
    const id = req.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Category.findByIdAndDelete(id);
    return NextResponse.json({ message: "Category deleted." });
} 