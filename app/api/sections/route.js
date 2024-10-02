import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import Section from "@/models/Section"

export async function POST(req) {
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
}

export async function GET(req) {
    await connectMongoDB();
    const sections = await Section.find().sort({ sequence: 1 });
    return NextResponse.json({ sections });
}

export async function DELETE(req) {
    const id = req.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Section.findByIdAndDelete(id);
    return NextResponse.json({ message: "Section deleted." });
} 