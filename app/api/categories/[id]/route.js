import { NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import Category from "@/models/Category"

export async function PUT(req, { params }) {
    let { id } = params;
    let { name_es: name_es,
        name_en: name_en,
        name_pt: name_pt,
        description: description,
        sequence: sequence,
        publish: publish,
        section: section,
        products: products,
        lastUpdateUser: lastUpdateUser } = await req.json();

    await connectMongoDB();
    await Category.findByIdAndUpdate(id, {
        name_es, name_en, name_pt, sequence, section,
        description, publish, products, lastUpdateUser
    });
    return NextResponse.json({ message: "Category edited." }, { status: 200 });
}
export async function GET(req, { params }) {
    const { id } = params;
    await connectMongoDB();
    const category = await Category.findOne({ _id: id });
    return NextResponse.json({ category }, { status: 200 });
}