import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import Category from "@/models/Category"
import { getToken } from "next-auth/jwt"

export async function POST(req) {
    const token = await getToken({ req });

    if (token) {
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
    } else {
        return NextResponse.json({ message: "Not Authotized" }, { status: 401 });
    }
}

export async function PUT(req, response) {
    const token = await getToken({ req });

    if (token) {
        try {
            const categories = await req.json();

            await connectMongoDB();

            const updatePromises = categories.map(category =>
                Category.updateOne(
                    { _id: category._id },
                    { $set: category }
                )
            );

            await Promise.all(updatePromises);

            return NextResponse.json({ message: "Category updated" }, { status: 200 });
        } catch (error) {
            console.error("Error updating categories:", error);
            return NextResponse.json({ error: "Failed to update categories" }, { status: 500 });
        }
    } else {
        return NextResponse.json({ message: "Not Authotized" }, { status: 401 });
    }
}


export async function GET(req) {
    await connectMongoDB();
    const categories = await Category.find().sort({ sequence: 1 });
    return NextResponse.json({ categories });
}

export async function DELETE(req) {
    const token = await getToken({ req });

    if (token) {
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
    } else {
        return NextResponse.json({ message: "Not Authotized" }, { status: 401 });
    }
}