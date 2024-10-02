import { NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import Category from "@/models/Category"

export async function PUT(req, { params }) {
    try {
        let { id } = params;
        let category = await req.json();

        await connectMongoDB();
        const updatedCategory = await Category.findByIdAndUpdate(id, category, { new: true });

        if (!updatedCategory) {
            return NextResponse.json(
                { message: "Category not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                message: "Category updated successfully",
                section: updatedCategory
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Error updating category", error: error.message },
            { status: 500 }
        );
    }
}
export async function GET(req, { params }) {
    const { id } = params;
    await connectMongoDB();
    const category = await Category.findOne({ _id: id });
    return NextResponse.json({ category }, { status: 200 });
}