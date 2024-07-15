import React from "react";
import {
  Home,
  Settings,
  Users,
  FileText,
  LightbulbOff,
  Briefcase,
  Heart,
  CreditCard,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Sidebar = ({
  owner,
  active,
}: {
  owner: Owner;
  active: "home" | "settings" | "clients";
}) => {
  const menuItems = [
    {
      id: "home",
      icon: Home,
      label: "Home",
      slug: `
/${owner.companySlug}
      `,
    },

    { id: "clients", icon: Users, label: "Clients", slug: "/clients" },
  ];

  const teamItems = [
    {
      id: "Billing",
      icon: CreditCard,
      label: "Billing",
      slug: `${owner.companySlug}/billing`,
    },
    {
      id: "settings",
      icon: Settings,
      label: "Settings",
      slug: `${owner.companySlug}/settings`,
    },
  ];

  const MenuItem = ({
    id,
    icon: Icon,
    label,
    slug,
  }: {
    id: string;
    icon: React.ElementType;
    label: string;
    slug: string;
  }) => (
    <li>
      <Link
        href={slug}
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
      <div className="flex items-center mb-10 justify-center md:justify-start">
        <div className="w-10 h-10 rounded-lg md:mr-3">
          <img
            src={owner.companyIconUrl}
            alt="Owner Image"
            className="w-full h-full rounded-lg"
          />
        </div>
        <h1 className="text-2xl font-bold hidden md:inline">
          {owner.companyName}
        </h1>
      </div>

      <nav className="flex-grow">
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <MenuItem key={item.id} {...item} />
          ))}
        </ul>
      </nav>

      <div className="mt-auto">
        <h2 className="text-sm uppercase text-gray-500 mb-3 font-semibold tracking-wider hidden md:block">
          Agency Settings
        </h2>
        <ul className="space-y-3">
          {teamItems.map((item) => (
            <MenuItem key={item.id} {...item} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
