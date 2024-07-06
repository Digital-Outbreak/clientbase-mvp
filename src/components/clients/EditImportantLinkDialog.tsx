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
import { updateImportantLink } from "@/lib/db/client-queries";
import { showToast } from "@/lib/utils";
import { useRouter } from "next/navigation";

type Client = {
  id: string;
  links: string[];
};

const EditImportantLinkDialog = ({
  children,
  index,
  client,
}: {
  children: React.ReactNode;
  client: Client;
  index: number;
}) => {
  const router = useRouter();
  const [clientLinks, setClientLinks] = useState<string[]>(client.links);

  const handleLinkChange = (links: string[]) => {
    setClientLinks(links);
  };

  const updateLink = async () => {
    const link = clientLinks[index];
    if (!link) {
      showToast("Please add a link to continue");
      return;
    }

    const newLink = await updateImportantLink(link, client.id, index);
    if (newLink) {
      showToast("Link updated successfully");
      router.replace(window.location.pathname);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="lg:max-w-screen-lg overflow-y-scroll max-h-screen">
        <DialogHeader>
          <DialogTitle className="text-2xl">Edit Link</DialogTitle>
          <DialogDescription className="capitalize">
            Please fill out the form below to update the link.
          </DialogDescription>
        </DialogHeader>
        <LinkEditor
          index={index}
          client={{ ...client, links: clientLinks }}
          setClientLinks={handleLinkChange}
        />
        <DialogFooter>
          <DialogClose>
            <Button variant="destructive">Cancel</Button>
          </DialogClose>
          <Button onClick={updateLink} className="ml-2" type="button">
            Update Link
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditImportantLinkDialog;
