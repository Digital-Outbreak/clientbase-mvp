import { CircleCheckBig, Folder, HomeIcon, Link2 } from "lucide-react";
import Image from "next/image";
import React from "react";

type ClientHeaderProps = {
  banner: string;
  companyName: string;
  active: "home" | "important-links" | "file-manager" | "project-manager";
};

const ClientHeader = ({ banner, companyName, active }: ClientHeaderProps) => {
  const Items = [
    {
      icon: HomeIcon,
      label: "Welcome 👋",
      active: active === "home",
    },
    {
      icon: Link2,
      label: "Important Links",
      active: active === "important-links",
    },
    {
      icon: Folder,
      label: "File Manager",
      active: active === "file-manager",
    },
    {
      icon: CircleCheckBig,
      label: "Project Manager",
      active: active === "project-manager",
    },
  ];

  const activeItem = Items.find((item) => item.active);

  return (
    <div>
      <div className="relative">
        <Image
          src={banner}
          alt={companyName}
          width={1200}
          height={400}
          className="relative object-cover w-[98%] h-48 mt-3 mx-auto rounded-lg"
        />
        <div className="absolute -bottom-20 w-full h-full flex justify-center items-end">
          <div className="flex flex-col justify-center items-center">
            <div className="bg-purple-950 w-32 h-32 flex justify-center items-center rounded-full">
              {activeItem?.icon &&
                React.createElement(activeItem.icon, {
                  size: 64,
                  color: "white",
                })}
            </div>
            <h1 className="text-white text-3xl font-semibold text-center mt-2">
              {activeItem?.label}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientHeader;
