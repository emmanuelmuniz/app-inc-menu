import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import Product from "@/models/Product"

export async function POST(req) {
    let { name_es, name_en, name_pt, price, description_es, description_en, description_pt, publish, category } = await req.json();

    let product = {
        name_es: name_es,
        name_en: name_en,
        name_pt: name_pt,
        price: price,
        description_es: description_es,
        description_en: description_en,
        description_pt: description_pt,
        publish: publish,
        category: category
    }

    await connectMongoDB();
    await Product.create(product);
    return NextResponse.json({ message: "Product created" }, { status: 201 });
}

export async function GET(req) {
    await connectMongoDB();
    const products = await Product.find();
    return NextResponse.json({ products });
}

export async function DELETE(req) {
    const id = req.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Product.findByIdAndDelete(id);
    return NextResponse.json({ message: "Product deleted." });
} 