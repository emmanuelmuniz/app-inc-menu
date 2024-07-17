import { NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import Section from "@/models/Section"

export async function PUT(req, { params }) {
    let { id } = params;
    let { name_es: name_es,
        name_en: name_en,
        name_pt: name_pt,
        categories: categories,
        description: description,
        sequence: sequence,
        publish: publish,
        lastUpdateUser: lastUpdateUser } = await req.json();

    await connectMongoDB();
    await Section.findByIdAndUpdate(id, {
        name_es, name_en, name_pt,
        description, sequence, categories, publish, lastUpdateUser
    });
    return NextResponse.json({ message: "Section edited." }, { status: 200 });
}

export async function GET(req, { params }) {
    const { id } = params;
    await connectMongoDB();
    const section = await Section.findOne({ _id: id });
    return NextResponse.json({ section }, { status: 200 });
}