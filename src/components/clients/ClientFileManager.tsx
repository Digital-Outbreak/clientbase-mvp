import React from "react";
import { Button } from "../ui/button";
import { EllipsisVertical, PlusSquareIcon } from "lucide-react";
import Image from "next/image";
import { showToast } from "@/lib/utils";
import Moment from "react-moment";

import ClientUploadImageDialog from "./ClientUploadFileDialog";

const ClientFileManager = ({ client }: { client: Client }) => {
  if (!client) {
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
        <p className="text-gray-400 text-sm">Loading...</p>
      </div>
    );
  }

  // Check if client.files is defined and has length before mapping
  const renderFiles = () => {
    if (!client.files || client.files.length === 0) {
      return (
        <div>
          <p className="text-gray-400 text-sm">
            No files uploaded for this client
          </p>
        </div>
      );
    }

    return client.files.map((file, index) => (
      <div
        key={index} // Ensure each item has a unique key
        className="bg-primary/10 shadow-md rounded-lg p-3 flex flex-col justify-between items-start gap-4 border border-primary/20 hover:shadow-lg transition duration-300 ease-in-out cursor-pointer"
      >
        <div className="flex flex-col gap-2 w-full h-full">
          <Image
            src={file.url}
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
                {file.name}
              </span>{" "}
              <br />
              Created:{" "}
              <span className="font-bold">
                <Moment fromNow>{file.createdAt}</Moment>
              </span>
            </p>
            <EllipsisVertical
              size={24}
              className="text-gray-400 hover:text-primary/70"
            />
          </div>
        </div>
      </div>
    ));
  };

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
        {renderFiles()}
      </div>
    </div>
  );
};

export default ClientFileManager;
