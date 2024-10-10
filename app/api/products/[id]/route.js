import { NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import Product from "@/models/Product"
import { getToken } from "next-auth/jwt"

export async function PUT(req, { params }) {
    const token = await getToken({ req });

    if (token) {
        try {
            let { id } = params;
            let product = await req.json();

            await connectMongoDB();
            const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });

            if (!updatedProduct) {
                return NextResponse.json(
                    { message: "Product not found" },
                    { status: 404 }
                );
            }

            return NextResponse.json(
                {
                    message: "Product updated successfully",
                    product: updatedProduct
                },
                { status: 200 }
            );
        } catch (error) {
            return NextResponse.json(
                { message: "Error updating product", error: error.message },
                { status: 500 }
            );
        }
    } else {
        return NextResponse.json({ message: "Not Authotized" }, { status: 401 });
    }
}

export async function GET(req, { params }) {
    const token = await getToken({ req });

    if (token) {
        const { id } = params;
        await connectMongoDB();
        const product = await Product.findOne({ _id: id });
        return NextResponse.json({ product }, { status: 200 });
    } else {
        return NextResponse.json({ message: "Not Authotized" }, { status: 401 });
    }
}