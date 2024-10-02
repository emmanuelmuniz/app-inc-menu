import { NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import Section from "@/models/Section"

export async function PUT(req, { params }) {
    try {
        let { id } = params;
        let section = await req.json();

        await connectMongoDB();
        const updatedSection = await Section.findByIdAndUpdate(id, section, { new: true });

        if (!updatedSection) {
            return NextResponse.json(
                { message: "Section not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                message: "Section updated successfully",
                section: updatedSection
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Error updating section", error: error.message },
            { status: 500 }
        );
    }
}

export async function GET(req, { params }) {
    const { id } = params;
    await connectMongoDB();
    const section = await Section.findOne({ _id: id });
    return NextResponse.json({ section }, { status: 200 });
}