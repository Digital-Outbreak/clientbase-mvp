// server functions

"use server";
import { Owner } from "@prisma/client";
import { handleError } from "../utils";
import prisma from "./db";
import { unstable_noStore as noStore } from "next/cache";
import { User } from "@clerk/nextjs/server";

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
  const files = [] as FileData[];
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
        links: [],
        files: { create: files },
      },
    });
    return newClient;
  } catch (error: any) {
    console.error(`Error creating client: ${error.message}`);
    return null;
  }
};

export const addTeamMember = async (user: {
  id: string;
  emailAddresse: string;
  name: string;
  ownerId: string;
}) => {
  try {
    const newMember = await prisma.teamMember.create({
      data: {
        id: user.id,
        clerkId: user.id,
        email: user.emailAddresse,
        name: user.name,
        ownerId: user.ownerId,
        teamRole: "MEMBER",
      },
    });

    const agencyOwner = await getOwnerById(user.ownerId);

    if (!agencyOwner) {
      throw new Error("Owner not found");
    }

    const updatedOwner = await prisma.owner.update({
      where: { id: user.ownerId },
      data: {
        teamMembers: {
          connect: { id: newMember.id },
        },
      },
    });

    return updatedOwner;
  } catch (error) {
    handleError(error);
    return null;
  }
};
