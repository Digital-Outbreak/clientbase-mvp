import React from "react";
import { Button } from "../ui/button";
import { EllipsisVertical, PlusSquareIcon } from "lucide-react";
import Image from "next/image";
import { defaultBannerUrl } from "@/lib/data";
import ClientUploadImageDialog from "./ClientUploadFileDialog";

const ClientFileManager = ({ client }: { client: Client }) => {
  return (
    <div className="p-4">
      <div className="flex justify-end items-center mb-4">
        <ClientUploadImageDialog client={client}>
          <Button className="flex gap-2 items-center">
            <PlusSquareIcon size={24} />
            Upload File
          </Button>
        </ClientUploadImageDialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-primary/10 shadow-md rounded-lg p-3 flex flex-col justify-between items-start gap-4 border border-primary/20 hover:shadow-lg transition duration-300 ease-in-out cursor-pointer">
          <div className="flex flex-col gap-2 w-full h-full">
            <Image
              src={defaultBannerUrl}
              width={500}
              height={100}
              className="rounded-lg object-cover"
              alt="File"
            />
            <div className="flex justify-between items-start w-full">
              <p
                className="text-gray-400 text-sm"
                style={{ maxWidth: "300px", overflow: "hidden" }}
              >
                <span className="text-white/90 font-bold text-lg">
                  ParkView.png{" "}
                </span>{" "}
                <br />
                Created at: <span className="font-bold">2021-09-12</span> • By{" "}
                <span className="font-bold">John Doe</span>
              </p>
              <EllipsisVertical
                size={24}
                className="text-gray-400 hover:text-primary/70"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientFileManager;
