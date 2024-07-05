import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  CircleCheckBig,
  Folder,
  HomeIcon,
  Link2,
  MessageCircleMore,
  Settings,
} from "lucide-react";
import Image from "next/image";
import { generateCustomSlug } from "@/lib/data";

type ClientSidebarProps = {
  client: Client;
  active:
    | "home"
    | "important-links"
    | "file-manager"
    | "project-manager"
    | "message";
};

export default function ClientSidebar({ client, active }: ClientSidebarProps) {
  const slugBefore = `${generateCustomSlug(client.clientCompany)}`;
  const navItems = [
    {
      href: `${slugBefore}/`,
      icon: HomeIcon,
      label: "Home",
      active: active === "home",
    },
    {
      href: `${slugBefore}/important-links`,
      icon: Link2,
      label: "Important Links",
      active: active === "important-links",
    },
    {
      href: `/file-manager`,
      icon: Folder,
      label: "File Manager",
      active: active === "file-manager",
    },
    {
      href: `/project-manager`,
      icon: CircleCheckBig,
      label: "Project Manager",
      active: active === "project-manager",
    },
  ];
  return (
    <div
      className="flex p-4 items-center bg-background z-[999] border-r-2 border-gray-900 flex-col border-dotted 
    h-screen justify-between"
    >
      <div>
        <div className="flex flex-row justify-center gap-3 items-center">
          <Image
            src={client.pfpUrl}
            alt={client.companyName}
            width={50}
            height={50}
            className="rounded-full object-cover border-white border-2"
            style={{ width: "40px", height: "40px" }}
          />

          <h1 className="hidden md:block text-3xl font-semibold">
            {client.clientCompany}
          </h1>
        </div>

        <nav className="mt-10 w-full">
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-none sm:flex sm:flex-col sm:gap-0">
            {navItems.map((item, index) => (
              <li key={index} className="mb-2">
                <a
                  href={item.href}
                  className={`block py-2 px-4 rounded-md transition-colors duration-300 ${
                    item.active
                      ? "bg-purple-950 text-white"
                      : "hover:bg-purple-950 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <item.icon className="w-6 h-6" />{" "}
                    <span className="hidden lg:inline">{item.label}</span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mb-2">
        <a
          href={`/messages`}
          className={`block py-2 px-4 rounded-md transition-colors duration-300 ${
            active == "message"
              ? "bg-purple-950 text-white"
              : "hover:bg-purple-950 hover:text-white"
          }`}
        >
          <div className="flex items-center gap-2">
            <MessageCircleMore className="w-7 h-7" />{" "}
            <span className="hidden lg:inline">Messages</span>
          </div>
        </a>
      </div>
    </div>
  );
}
