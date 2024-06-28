"use server";
import prisma from "./db";

export const getClientsByOwner = async (ownerId: string) => {
  try {
    const clients = await prisma.client.findMany({
      where: { ownerId },
    });
    return clients;
  } catch (error: any) {
    console.error(`Error creating client: ${error.message}`);
    return null;
  }
};
