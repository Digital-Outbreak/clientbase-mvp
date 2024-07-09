"use server";
import prisma, { supabase } from "./db";
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
    const client = await prisma.client.findUnique({
      where: { id: clientId },
      select: { links: true },
    });

    if (!client || !client.links) {
      throw new Error("Client not found or links not defined");
    }

    const updatedLinks = [...client.links];
    if (index >= 0 && index < updatedLinks.length) {
      updatedLinks[index] = link;
    } else {
      throw new Error("Index out of bounds");
    }

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

export const updateFiles = async (client: Client, tempFiles: FileData[]) => {
  try {
    for (const file of tempFiles) {
      await prisma.formData.create({
        data: {
          name: file.name,
          url: file.url,
          clientId: client.id,
        },
      });
    }
    return true;
  } catch (error) {
    console.error("Error updating files:", error);
    return null; // or handle error as needed
  }
};

export const getUploadedFiles = async (clientId: string) => {
  try {
    const files = await prisma.formData.findMany({
      where: { clientId },
    });
    return files;
  } catch (error: any) {
    console.error(`Error getting files: ${error.message}`);
    return null;
  }
};
