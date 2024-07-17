import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import Section from "@/models/Section"

export async function POST(req) {
    let { name_es, name_en, name_pt, description, categories, publish } = await req.json();

    let section = {
        name_es: name_es,
        name_en: name_en,
        name_pt: name_pt,
        categories: categories,
        description: description,
        publish: publish
    }

    await connectMongoDB();
    await Section.create(section);
    return NextResponse.json({ message: "Section created" }, { status: 201 });
}

export async function GET(req) {
    await connectMongoDB();
    const sections = await Section.find();
    return NextResponse.json({ sections });
}

export async function DELETE(req) {
    const id = req.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Section.findByIdAndDelete(id);
    return NextResponse.json({ message: "Section deleted." });
} 