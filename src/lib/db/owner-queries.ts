// server functions

"use server";
import { handleError } from "../utils";
import prisma from "./db";
import { unstable_noStore as noStore } from "next/cache";

export const getOwnerById = async (id: string): Promise<Owner | null> => {
  noStore();
  try {
    const owner = await prisma.owner.findUnique({
      where: { id },
    });
    return owner;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const updateOwner = async (id: string, owner: any) => {
  try {
    const updatedOwner = await prisma.owner.update({
      where: { id },
      data: owner,
    });
    return updatedOwner;
  } catch (error: any) {
    console.error(`Error updating owner with id ${id}: ${error.message}`);
    return null;
  }
};

export const getOwnerBySlug = async (slug: string): Promise<Owner | null> => {
  noStore();

  try {
    const owner: Owner | null = await prisma.owner.findFirst({
      where: { companySlug: slug },
    });

    if (!owner) {
      throw new Error(`Owner with slug ${slug} not found`);
    }
    return owner;
  } catch (error: any) {
    console.error(`Error fetching owner by slug ${slug}: ${error.message}`);
    return null;
  }
};

export const createClient = async (client: any) => {
  try {
    const newClient = await prisma.client.create({
      data: {
        name: client.name,
        email: client.email,
        companyName: client.companyName,
        clientSlug: client.clientSlug,
        loom: client.loom,
        password: client.password,
        pfpUrl: client.pfpUrl,
        bannerUrl: client.bannerUrl,
        ownerId: client.ownerId,
        clientCompany: client.clientCompany,
        files: [],
        links: [],
      },
    });
    return newClient;
  } catch (error: any) {
    console.error(`Error creating client: ${error.message}`);
    return null;
  }
};
