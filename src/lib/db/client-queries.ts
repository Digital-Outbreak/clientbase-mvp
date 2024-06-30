"use server";
import prisma from "./db";
import { unstable_noStore as noStore } from "next/cache";

export const getClientsByOwner = async (ownerId: string) => {
  noStore();
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

export const getClientBySlug = async (slug: string) => {
  noStore();
  try {
    const client = await prisma.client.findUnique({
      where: { clientSlug: slug },
    });
    return client;
  } catch (error: any) {
    console.error(`Error creating client: ${error.message}`);
    return null;
  }
};
