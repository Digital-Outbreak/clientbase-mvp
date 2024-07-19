import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  CircleCheckBig,
  Folder,
  Home as HomeIcon,
  Link2,
  MessageCircleMore,
  UserPlus2,
} from "lucide-react";
import { generateCustomSlug } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type ClientSidebarProps = {
  client: Client;
  active:
    | "home"
    | "important-links"
    | "file-manager"
    | "project-manager"
    | "message";
};

const ClientSidebar = ({ client, active }: ClientSidebarProps) => {
  const agencySlug = generateCustomSlug(client.companyName);
  const clientSlug = generateCustomSlug(client.clientCompany);

  const navItems = [
    {
      id: "home",
      href: `/${agencySlug}/${clientSlug}`,
      icon: HomeIcon,
      label: "Home",
    },
    {
      id: "important-links",
      href: `/${agencySlug}/${clientSlug}/important-links`,
      icon: Link2,
      label: "Important Links",
    },
    {
      id: "file-manager",
      href: `/${agencySlug}/${clientSlug}/file-manager`,
      icon: Folder,
      label: "File Manager",
    },
    {
      id: "project-manager",
      href: `/${agencySlug}/${clientSlug}/project-manager`,
      icon: CircleCheckBig,
      label: "Project Manager",
    },
  ];

  const MenuItem = ({
    id,
    href,
    icon: Icon,
    label,
  }: {
    id: string;
    href: string;
    icon: React.ElementType;
    label: string;
  }) => (
    <li>
      <Link
        href={href}
        passHref
        className={cn(
          "flex items-center p-3 rounded-lg transition-all duration-200 hover:bg-gray-800",
          active === id && "bg-purple-600 hover:bg-purple-700"
        )}
      >
        <Icon className="mr-0 md:mr-3" size={22} />
        <span className="font-medium hidden md:inline">{label}</span>
      </Link>
    </li>
  );

  return (
    <div className="w-20 md:w-64 h-screen bg-gray-900 text-white p-4 md:p-6 flex flex-col">
      <div className="flex gap-2 items-center mb-10 justify-center md:justify-start">
        <Avatar>
          <AvatarImage src={client.pfpUrl} />
          <AvatarFallback>
            {client.clientCompany
              .split(" ")
              .map((word) => word[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold hidden md:inline">
          {client.companyName}
        </h1>
      </div>

      <nav className="flex-grow">
        <ul className="space-y-4">
          {navItems.map((item) => (
            <MenuItem key={item.id} {...item} />
          ))}
        </ul>
      </nav>

      <div className="mt-auto">
        <h2 className="text-sm uppercase text-gray-500 mb-3 font-semibold tracking-wider hidden md:block">
          {client.companyName} Social
        </h2>
        <ul className="space-y-3">
          {/* for messages only */}
          <MenuItem
            id="message"
            href={`/${agencySlug}/${clientSlug}/messages`}
            icon={MessageCircleMore}
            label="Messages"
          />
          {/* 
          TODO: Later Work
          invite
          <MenuItem
            id="invite"
            href={`/${agencySlug}/${clientSlug}/invite`}
            icon={UserPlus2}
            label="Invite Team"
          /> */}
        </ul>
      </div>
    </div>
  );
};

export default ClientSidebar;
