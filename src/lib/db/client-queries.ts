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

export const kanbadAddCardToLane = async (
  client: Client,
  lane: "Backlog" | "Todo" | "InProgress" | "Done",
  title: string,
  dueDate: Date
) => {
  try {
    lane = lane.replace(/\s/g, "") as
      | "Backlog"
      | "Todo"
      | "InProgress"
      | "Done";
    const newCard = await prisma.kanbanCard.create({
      data: {
        dueDate,
        title,
        lane,
        ownerId: client.ownerId,
        clientId: client.id,
      },
    });
    return newCard;
  } catch (error: any) {
    console.error(`Error creating card: ${error.message}`);
    return null;
  }
};
export const getKanbanCardsByLane = async (
  clientId: string,
  lane: "Backlog" | "Todo" | "InProgress" | "Done"
) => {
  try {
    const cards = await prisma.kanbanCard.findMany({
      where: {
        clientId: clientId, // Check if this is correct; it should match your Prisma schema
        lane: lane, // Check if this is correct; it should match your Prisma schema
      },
    });
    return cards;
  } catch (error: any) {
    console.error(`Error getting cards: ${error.message}`);
    return null;
  }
};

export const updateKanbanCardLane = async (
  cardId: string,
  lane: "Backlog" | "Todo" | "InProgress" | "Done"
) => {
  try {
    lane = lane.replace(/\s/g, "") as
      | "Backlog"
      | "Todo"
      | "InProgress"
      | "Done";
    const updatedCard = await prisma.kanbanCard.update({
      where: { id: cardId },
      data: { lane },
    });
    return updatedCard;
  } catch (error: any) {
    console.error(`Error updating card: ${error.message}`);
    return null;
  }
};

export const getChannelsByClient = async (clientId: string) => {
  try {
    const channels = await prisma.channel.findMany({
      where: { clientId },
    });
    return channels;
  } catch (error: any) {
    console.error(`Error getting channels: ${error.message}`);
    return null;
  }
};

export const getMessagesFromChannelId = async (channelId: string) => {
  try {
    const messages = await prisma.message.findMany({
      where: { channelId },
    });
    return messages;
  } catch (error: any) {
    console.error(`Error getting messages: ${error.message}`);
    return null;
  }
};
