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
import LinkEditor from "./LinkEditor";
import { useState } from "react";
import { Button } from "../ui/button";
import { createImportantLink } from "@/lib/db/client-queries";
import { showToast } from "@/lib/utils";
import { useRouter } from "next/navigation";

const AddImportantLinkDialog = ({
  children,
  client,
}: {
  children: React.ReactNode;
  client: Client;
}) => {
  const router = useRouter();
  const [link, setLink] = useState<string>("");

  const addLink = async () => {
    if (!link) {
      showToast("Please add a link to continue");
      return;
    }
    const newLink = await createImportantLink(link, client.id);
    if (newLink) {
      showToast("Link added successfully");
      setLink("");
      if (typeof window !== "undefined") {
        window.location.reload();
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="lg:max-w-screen-lg overflow-y-scroll max-h-screen">
        <DialogHeader>
          <DialogTitle className="text-2xl">Add A New Link</DialogTitle>
          <DialogDescription className="capitalize">
            Please fill out the form below to add something important, maybe a
            password or live links, etc.
          </DialogDescription>
        </DialogHeader>
        <LinkEditor setValue={setLink} />
        <DialogFooter>
          <DialogClose>
            <Button variant="destructive">Cancel</Button>
          </DialogClose>
          <Button onClick={addLink} className="ml-2" type="button">
            Add Link
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddImportantLinkDialog;
