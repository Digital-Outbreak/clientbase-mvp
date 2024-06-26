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
