import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import Product from "@/models/Product"

export async function POST(req) {
    try {
        let product = await req.json();
        await connectMongoDB();
        const createdProduct = await Product.create(product);

        return NextResponse.json(
            {
                message: "Product created successfully",
                product: createdProduct
            },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Error creating product", error: error.message },
            { status: 500 }
        );
    }
}

export async function PUT(req, response) {
    try {
        const products = await req.json();

        await connectMongoDB();

        const updatePromises = products.map(product =>
            Product.updateOne(
                { _id: product._id },
                { $set: product }
            )
        );

        await Promise.all(updatePromises);

        return NextResponse.json({ message: "Products updated" }, { status: 200 });
    } catch (error) {
        console.error("Error updating products:", error);
        return NextResponse.json({ error: "Failed to update products" }, { status: 500 });
    }
}

export async function GET(req) {
    await connectMongoDB();
    const products = await Product.find().sort({ sequence: 1 });
    return NextResponse.json({ products });
}

export async function DELETE(req) {
    try {
        const id = req.nextUrl.searchParams.get("id");

        if (!id) {
            return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
        }

        await connectMongoDB();
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }

        return NextResponse.json(
            { message: "Product deleted", product: deletedProduct },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Error deleting product", error: error.message },
            { status: 500 }
        );
    }
}