import prisma from "@/lib/db/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, email_addresses, first_name, image_url } = body?.data;

    const email = email_addresses[0]?.email_address;
    console.log("✅", body);

    prisma.owner.create({
      data: {
        clerkId: id,
        email: email,
        name: first_name,
        imageUrl: image_url,
        role: "NOAGENCY",
        companyName: "", // Add the companyName property with an empty string value
        compnayIconUrl: "", // Add the companyIconUrl property with an empty string value
      },
    });

    return new NextResponse("User updated in database successfully", {
      status: 200,
    });
  } catch (error) {
    console.error("Error updating database:", error);
    return new NextResponse("Error updating user in database", { status: 500 });
  }
}
