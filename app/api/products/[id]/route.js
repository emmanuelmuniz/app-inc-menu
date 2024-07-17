import { NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import Product from "@/models/Product"

export async function PUT(req, { params }) {
    let { id } = params;
    let { name_es: name_es,
        name_en: name_en,
        name_pt: name_pt,
        price: price,
        description: description,
        sequence: sequence,
        category: category,
        publish: publish,
        lastUpdateUser: lastUpdateUser } = await req.json();
        
    await connectMongoDB();
    await Product.findByIdAndUpdate(id, {
        name_es, name_en, name_pt, price,
        description, sequence, category, publish, lastUpdateUser
    });
    return NextResponse.json({ message: "Product edited." }, { status: 200 });
}

export async function GET(req, { params }) {
    const { id } = params;
    await connectMongoDB();
    const product = await Product.findOne({ _id: id });
    return NextResponse.json({ product }, { status: 200 });
}