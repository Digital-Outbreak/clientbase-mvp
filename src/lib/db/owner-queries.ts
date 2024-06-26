"use server";
import { handleError } from "../utils";
import prisma from "./db";

export const getOwnerById = async (id: string): Promise<Owner | null> => {
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
