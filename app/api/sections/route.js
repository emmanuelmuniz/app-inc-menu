import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import Section from "@/models/Section"
import { getToken } from "next-auth/jwt"

export async function POST(req) {
    const token = await getToken({ req });

    if (token) {
        try {
            let section = await req.json();
            await connectMongoDB();
            const createdSection = await Section.create(section);

            return NextResponse.json(
                {
                    message: "Section created successfully",
                    product: createdSection
                },
                { status: 201 }
            );
        } catch (error) {
            return NextResponse.json(
                { message: "Error creating section", error: error.message },
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
            const sections = await req.json();

            await connectMongoDB();

            const updatePromises = sections.map(section =>
                Section.updateOne(
                    { _id: section._id },
                    { $set: section }
                )
            );

            await Promise.all(updatePromises);

            return NextResponse.json({ message: "Sections updated" }, { status: 200 });
        } catch (error) {
            console.error("Error updating sections:", error);
            return NextResponse.json({ error: "Failed to update sections" }, { status: 500 });
        }
    } else {
        return NextResponse.json({ message: "Not Authotized" }, { status: 401 });
    }
}

export async function GET(req) {
    await connectMongoDB();
    const sections = await Section.find().sort({ sequence: 1 });
    return NextResponse.json({ sections });
}

export async function DELETE(req) {
    const token = await getToken({ req });

    if (token) {
        try {
            const id = req.nextUrl.searchParams.get("id");

            if (!id) {
                return NextResponse.json({ message: "Section ID is required" }, { status: 400 });
            }

            await connectMongoDB();
            const deletedSection = await Section.findByIdAndDelete(id);

            if (!deletedSection) {
                return NextResponse.json({ message: "Section not found" }, { status: 404 });
            }

            return NextResponse.json(
                { message: "Section deleted", section: deletedSection },
                { status: 200 }
            );
        } catch (error) {
            return NextResponse.json(
                { message: "Error deleting section", error: error.message },
                { status: 500 }
            );
        }
    } else {
        return NextResponse.json({ message: "Not Authotized" }, { status: 401 });
    }
}