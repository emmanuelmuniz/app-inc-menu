import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import Product from "@/models/Product"

export async function POST(req) {
    try {
        // Parsear el cuerpo de la solicitud
        let product = await req.json();

        // Conectar a la base de datos
        await connectMongoDB();

        // Crear el producto y guardarlo en una variable
        const createdProduct = await Product.create(product);

        // Devolver el producto creado y el código de estado 201
        return NextResponse.json(
            {
                message: "Product created successfully",
                product: createdProduct
            },
            { status: 201 }
        );
    } catch (error) {
        // En caso de error, devolver un código de estado 500 con el mensaje de error
        return NextResponse.json(
            { message: "Error creating product", error: error.message },
            { status: 500 }
        );
    }
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