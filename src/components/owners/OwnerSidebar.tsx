import React from "react";
import { Home, FileText, LightbulbOff, Briefcase, Heart } from "lucide-react";

const Sidebar = ({
  owner,
  active,
}: {
  owner: Owner;
  active: "home" | "important-links" | "file-manager" | "project-manager";
}) => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-6 flex flex-col">
      <div className="flex items-center mb-10">
        <div className="w-10 h-10 bg-purple-600 rounded-lg mr-3"></div>
        <h1 className="text-2xl font-bold">Contacts</h1>
      </div>

      <nav className="flex-grow">
        <ul className="space-y-4">
          <li>
            <a
              href="#"
              className="flex items-center p-3 bg-gray-800 rounded-lg transition-all duration-200 hover:bg-gray-700"
            >
              <Home className="mr-3" size={22} />
              <span className="font-medium">Overview</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-3 rounded-lg transition-all duration-200 hover:bg-gray-800"
            >
              <FileText className="mr-3" size={22} />
              <span className="font-medium">Tasks</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-3 rounded-lg transition-all duration-200 hover:bg-gray-800"
            >
              <LightbulbOff className="mr-3" size={22} />
              <span className="font-medium">Insights</span>
            </a>
          </li>
        </ul>
      </nav>

      <div className="mt-auto">
        <h2 className="text-sm uppercase text-gray-500 mb-3 font-semibold tracking-wider">
          TEAMS
        </h2>
        <ul className="space-y-3">
          <li>
            <a
              href="#"
              className="flex items-center p-3 rounded-lg transition-all duration-200 hover:bg-gray-800"
            >
              <Briefcase className="mr-3" size={22} />
              <span className="font-medium">Sales</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-3 rounded-lg transition-all duration-200 hover:bg-gray-800"
            >
              <Heart className="mr-3" size={22} />
              <span className="font-medium">Support</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
