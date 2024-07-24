"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { EllipsisVertical, PlusSquareIcon } from "lucide-react";
import Image from "next/image";
import { showToast } from "@/lib/utils";
import Moment from "react-moment";
import { getUploadedFiles } from "@/lib/db/client-queries";

const ClientFileManager = ({ client }: { client: Client }) => {
  const [files, setFiles] = useState<FileData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await getUploadedFiles(client.id);
        if (res) {
          const formattedFiles = res.map((file) => ({
            ...file,
            createdAt: file.createdAt.toString(),
            clientId: file.clientId || "", // Ensure clientId is always a string
          }));
          setFiles(formattedFiles);
        } else {
          throw new Error("Error fetching files");
        }
      } catch (error: any) {
        showToast(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [client.id]);

  if (loading) {
    return (
      <div className="p-4 flex justify-center items-center">
        <p className="text-gray-400 text-sm">Loading files...</p>
      </div>
    );
  }

  if (!files || files.length === 0) {
    return (
      <div className="p-4">
        <div className="flex justify-end items-center mb-4">
          <Button className="flex gap-2 items-center">
            <PlusSquareIcon size={24} />
            Upload File
          </Button>
        </div>
        <p className="text-gray-400 text-sm">
          No files uploaded for this client
        </p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-end items-center mb-4">
        <Button className="flex gap-2 items-center">
          <PlusSquareIcon size={24} />
          Upload File
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {files.map((file, index) => (
          <div
            key={index}
            className="bg-primary/10 shadow-md rounded-lg p-3 flex flex-col justify-between items-start gap-4 border border-primary/20 hover:shadow-lg transition duration-300 ease-in-out cursor-pointer"
          >
            <div className="flex flex-col gap-2 w-full h-full">
              <Image
                src={file.url}
                width={500}
                height={100}
                className="rounded-lg object-cover h-40 w-full"
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
        ))}
      </div>
    </div>
  );
};

export default ClientFileManager;
