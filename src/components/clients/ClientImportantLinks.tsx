"use client";
import React from "react";
import { Button } from "../ui/button";
import ReactMarkdown from "react-markdown";

import { PenIcon, PlusSquareIcon } from "lucide-react";
import AddImportantLinkDialog from "./AddImportantLinkDialog";
import EditImportantLinkDialog from "./EditImportantLinkDialog";

const ClientImportantLinks = ({ client }: { client: Client }) => {
  return (
    <div className="p-4">
      <div className="flex justify-end items-center mb-4">
        <AddImportantLinkDialog client={client}>
          <Button className="flex gap-2 items-center">
            <PlusSquareIcon size={24} />
            Add Another Link
          </Button>
        </AddImportantLinkDialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {client.links.length !== 0 ? (
          client.links.map((link, index) => (
            <div
              key={index}
              className="bg-primary/10 shadow-md rounded-lg p-6 flex flex-col justify-between items-start gap-4
        border border-primary/20 hover:shadow-lg transition duration-300 ease-in-out
        fade-out"
            >
              <div className="w-full h-full fade-text">
                <p className="text-sm text-gray-50">
                  <ReactMarkdown
                    components={{
                      a: ({ node, ...props }) => (
                        <a
                          {...props}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary underline"
                        />
                      ),
                      h1: ({ node, ...props }) => (
                        <h1 {...props} className="text-xl font-bold" />
                      ),
                    }}
                  >
                    {link}
                  </ReactMarkdown>
                </p>
              </div>
              <div className="flex justify-end gap-2 w-full">
                <EditImportantLinkDialog index={index} client={client}>
                  <Button className="flex gap-2 w-full">
                    <PenIcon size={16} />
                    Edit
                  </Button>
                </EditImportantLinkDialog>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-50">
            No important links added yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientImportantLinks;
