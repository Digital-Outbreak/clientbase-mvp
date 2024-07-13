// TypeScript types generated from Prisma schema

interface Owner {
  id: string;
  clerkId: string;
  email: string;
  name: string;
  companyName: string;
  imageUrl: string;
  companySlug: string | null;
  companyIconUrl: string;
  role: "NOAGENCY" | "AGENCY";
  createdAt: Date;
  updatedAt: Date;
}

interface Client {
  id: string;
  ownerId: string;
  name: string;
  email: string;
  loom: string;
  password: string;
  clientCompany: string;
  clientSlug: string | null;
  companyName: string;
  pfpUrl: string;
  bannerUrl: string;
  files: FileData[];
  links: string[];
  createdAt: Date;
  updatedAt: Date;
}
interface FileData {
  id: string;
  name: string;
  url: string;
  createdAt: string;
  clientId: string;
}

export interface Card {
  id: string;
  title: string;
  date?: Date;
}
export const predefinedValues = ["Task 1", "Task 2", "Task 3"];
export const lanes = ["Backlog", "ToDo", "In Progress", "Done"];
