import prisma from "@/lib/db/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, email_addresses, first_name, image_url } = body?.data;

    const email = email_addresses?.[0]?.email_address;
    console.log("✅ Received data:", body);

    if (!email) {
      return new NextResponse("Email address is missing", { status: 400 });
    }

    await prisma.owner.create({
      data: {
        id: id,
        clerkId: id,
        email: email,
        name: first_name || "",
        imageUrl: image_url || "",
        role: "NOAGENCY",
        companyName: "",
        companySlug: "",
        companyIconUrl: "",
      },
    });

    return new NextResponse("User created in the database successfully", {
      status: 200,
    });
  } catch (error: any) {
    console.error("Error updating database:", error);
    return new NextResponse(
      `Error updating user in database: ${error.message}`,
      { status: 500 }
    );
  }
}
