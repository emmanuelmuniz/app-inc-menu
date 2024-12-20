import { NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import Section from "@/models/Section"
import { getToken } from "next-auth/jwt"

export async function PUT(req, { params }) {
    const token = await getToken({ req });

    if (token) {
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
    } else {
        return NextResponse.json({ message: "Not Authotized" }, { status: 401 });
    }
}

export async function GET(req, { params }) {
    const token = await getToken({ req });

    if (token) {
        const { id } = params;
        await connectMongoDB();
        const section = await Section.findOne({ _id: id });
        return NextResponse.json({ section }, { status: 200 });
    } else {
        return NextResponse.json({ message: "Not Authotized" }, { status: 401 });
    }
}