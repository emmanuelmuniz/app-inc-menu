import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import Category from "@/models/Category"

export async function POST(req) {
    try {
        let category = await req.json();
        await connectMongoDB();
        const createdCategory = await Category.create(category);

        return NextResponse.json(
            {
                message: "Category created successfully",
                product: createdCategory
            },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Error creating category", error: error.message },
            { status: 500 }
        );
    }
}
export async function GET(req) {
    await connectMongoDB();
    const categories = await Category.find().sort({ sequence: 1 });
    return NextResponse.json({ categories });
}

export async function DELETE(req) {
    try {
        const id = req.nextUrl.searchParams.get("id");

        if (!id) {
            return NextResponse.json({ message: "Category ID is required" }, { status: 400 });
        }

        await connectMongoDB();
        const deletedCategory = await Category.findByIdAndDelete(id);

        if (!deletedCategory) {
            return NextResponse.json({ message: "Category not found" }, { status: 404 });
        }

        return NextResponse.json(
            { message: "Category deleted", category: deletedCategory },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Error deleting category", error: error.message },
            { status: 500 }
        );
    }
}