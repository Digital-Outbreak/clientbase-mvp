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

export const createImportantLink = async (link: string, clientId: string) => {
  noStore();
  try {
    const newLink = await prisma.client.update({
      where: { id: clientId },
      data: {
        links: {
          push: link,
        },
      },
    });
    return newLink;
  } catch (error: any) {
    console.error(`Error creating link: ${error.message}`);
    return null;
  }
};

export const updateImportantLink = async (
  link: string,
  clientId: string,
  index: number
) => {
  try {
    // Retrieve the current links array
    const client = await prisma.client.findUnique({
      where: { id: clientId },
      select: { links: true },
    });

    if (!client || !client.links) {
      throw new Error("Client not found or links not defined");
    }

    // Copy the current links and update the specified index
    const updatedLinks = [...client.links];
    if (index >= 0 && index < updatedLinks.length) {
      updatedLinks[index] = link;
    } else {
      throw new Error("Index out of bounds");
    }

    // Update the client with the modified links array
    const updatedClient = await prisma.client.update({
      where: { id: clientId },
      data: { links: updatedLinks },
    });

    return updatedClient;
  } catch (error: any) {
    console.error(`Error updating link: ${error.message}`);
    return null;
  }
};
