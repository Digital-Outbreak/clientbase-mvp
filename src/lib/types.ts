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
  teamRole: "ADMIN";
  teamMembers: TeamMember[];
  updatedAt: Date;
}

interface TeamMember {
  id: string;
  clerkId: string;
  email: string;
  name: string;
  teamRole: "ADMIN" | "MEMBER";
  ownerId: string;
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

interface KanbanCard {
  id: string;
  title: string;
  dueDate: Date;
  lane: "Backlog" | "Todo" | "InProgress" | "Done";
  clientId: string | null;
}
