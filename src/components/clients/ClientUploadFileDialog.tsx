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
import { supabase } from "@/lib/db/db";
import { showToast } from "@/lib/utils";
const ClientUploadImageDialog = ({
  children,
  client,
}: {
  children: React.ReactNode;
  client: Client;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);

  const uploadImages = async () => {
    setLoading(true);
    try {
      for (const file of files) {
        const fileName = `${client.companyName}/${client.clientCompany}/${file.name}`;
        const { error: uploadError } = await supabase.storage
          .from("file-manager")
          .upload(fileName, file, {
            cacheControl: "3600",
            upsert: true,
          });
        if (uploadError) throw uploadError;
      }
      setFiles([]);
      showToast("Files uploaded successfully");
      if (typeof window !== "undefined") {
        window.location.reload();
      }
    } catch (error: any) {
      console.error("Error uploading file: ", error.message);
      showToast("Error uploading file");
    }
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
          <Button
            disabled={files.length === 0 || loading}
            onClick={uploadImages}
            className="ml-2"
            type="button"
          >
            {loading ? "Uploading..." : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ClientUploadImageDialog;
