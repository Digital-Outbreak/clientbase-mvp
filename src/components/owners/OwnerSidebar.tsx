import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { HomeIcon, Settings } from "lucide-react";
import Image from "next/image";

type OwnerSidebarProps = {
  owner: Owner;
  active: "home" | "settings";
};

export default function OwnerSidebar({ owner, active }: OwnerSidebarProps) {
  const navItems = [
    {
      href: `/${owner.companySlug}`,
      icon: HomeIcon,
      label: "Home",
      active: active === "home",
    },
    {
      href: `/${owner.companySlug}/settings`,
      icon: Settings,
      label: "Settings",
      active: active === "settings",
    },
  ];
  return (
    <div className="flex p-4 items-center border-r-2 border-gray-900 flex-col border-dotted h-screen justify-between">
      <div>
        <div className="flex flex-row gap-5 items-center">
          <Image
            src={owner.companyIconUrl}
            alt={owner.companyName}
            width={50}
            height={50}
            className="rounded-full object-cover border-white border-2"
            style={{ width: "50px", height: "50px" }}
          />

          <h1 className="hidden font-bold md:block text-2xl">
            {owner.companyName}
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

      <div
        className="p-4
      bg-gradient-to-br from-purple-950 to-purple-900
      rounded-lg flex-col hidden lg:flex"
      >
        <Badge className="w-fit" variant="secondary">
          Note
        </Badge>
        <h1>This only a MVP</h1>
        <p>
          This is a MVP, some features may not work as expected. Please report
          any issues to the owner.
        </p>
      </div>

      <Badge className="block lg:hidden text-center rounded-sm">
        MVP Version
      </Badge>
    </div>
  );
}
