import React from "react";
import { Button } from "../ui/button";
import { PlusSquareIcon } from "lucide-react";
import Image from "next/image";
import { defaultBannerUrl } from "@/lib/data";

const ClientFileManager = ({ client }: { client: Client }) => {
  return (
    <div className="p-4">
      <div className="flex justify-end items-center mb-4">
        <Button className="flex gap-2 items-center">
          <PlusSquareIcon size={24} />
          Upload File
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          className="bg-primary/10 shadow-md rounded-lg p-6 flex flex-col justify-between items-start gap-4
        border border-primary/20 hover:shadow-lg transition duration-300 ease-in-out
        "
        >
          <div className="flex flex-col gap-2 w-full h-full">
            <Image
              src={defaultBannerUrl}
              width={500}
              height={100}
              className="rounded-lg object-cover"
              alt="File"
            />
            <h2 className="font-bold text-gray-300">ParkView.png</h2>
            <p
              className="text-gray-400 text-sm"
              style={{ maxWidth: "300px", overflow: "hidden" }}
            >
              Created at: <span className="font-bold">2021-09-12</span>• By{" "}
              <span className="font-bold">John Doe</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientFileManager;
