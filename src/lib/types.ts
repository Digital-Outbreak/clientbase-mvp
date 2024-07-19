interface Owner {
  id: string;
  clerkId: string;
  email: string;
  name: string;
  companyName: string;
  companySlug: string | null;
  imageUrl: string;
  companyIconUrl: string;
  role: "NOAGENCY" | "AGENCY";
  teamRole: "ADMIN" | "MEMBER";
  teamMembers: TeamMember[];
  clients: Client[];
  createdAt: Date;
  updatedAt: Date;
}

interface TeamMember {
  id: string;
  clerkId: string;
  email: string;
  name: string;
  teamRole: "ADMIN" | "MEMBER";
  ownerId: string;
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

interface KanbanCard {
  id: string;
  title: string;
  dueDate: Date;
  lane: "Backlog" | "Todo" | "InProgress" | "Done";
  clientId: string | null;
}

// Enums
enum OwnerRole {
  NOAGENCY = "NOAGENCY",
  AGENCY = "AGENCY",
}

enum TeamMemberRole {
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
}
