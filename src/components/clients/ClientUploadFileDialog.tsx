"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import UploadForm from "./UploadForm";
import { useState } from "react";
const ClientUploadImageDialog = ({
  children,
  client,
}: {
  children: React.ReactNode;
  client: Client;
}) => {
  const [files, setFiles] = useState<File[]>([]);

  const uploadImages = async () => {
    console.log(files);
  };
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="lg:max-w-screen-lg overflow-y-scroll max-h-screen">
        <DialogHeader>
          <DialogTitle className="text-2xl">Add A New File</DialogTitle>
          <DialogDescription className="capitalize">
            Please fill out the form below to upload a new file.
          </DialogDescription>
        </DialogHeader>
        <UploadForm setFiles={setFiles} files={files} />
        <DialogFooter>
          <DialogClose>
            <Button variant="destructive">Cancel</Button>
          </DialogClose>
          <Button onClick={uploadImages} className="ml-2" type="button">
            Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ClientUploadImageDialog;
