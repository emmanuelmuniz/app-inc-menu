import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import Product from "@/models/Product"

export async function POST(req) {
    let { name_es, name_en, name_pt, price, description, publish } = await req.json();

    let product = {
        name_es: name_es,
        name_en: name_en,
        name_pt: name_pt,
        price: price,
        description: description,
        publish: publish
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
