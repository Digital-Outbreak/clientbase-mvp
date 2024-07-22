import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { showToast } from "@/lib/utils";
import { addTeamMember } from "@/lib/db/owner-queries";
import { useRouter } from "next/navigation";

const AddTeamMemberDialog = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const user = useUser();
  const [agencyId, setAgencyId] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const joinAgency = async () => {
    setLoading(true);
    if (!user.isSignedIn || !user.isLoaded) {
      showToast("You Must Be Signed In To Join An Agency");
      return;
    }
    if (name === null || agencyId === null) {
      showToast("Please Fill Out All Fields");
      return;
    }
    try {
      const userModel = {
        id: user.user.id,
        emailAddresse: user.user.emailAddresses[0].emailAddress,
        name: name,
        ownerId: agencyId,
      };

      const teamMate = await addTeamMember(userModel);
      showToast("Joined Agency Successfully");

      router.push(`/${teamMate?.companySlug}`);

      setLoading(false);
    } catch (error) {
      showToast(`Error Joining Agency ${error}`);
    }
    setLoading;
  };

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl">Get Inside An Agency</DialogTitle>
          <DialogDescription className="capitalize text-gray-300 leading-6">
            You Must've Received An Agency Key To Join An Agency, Please Enter
            that here
          </DialogDescription>
        </DialogHeader>

        <Input
          placeholder="Your Name"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Agency Key"
          onChange={(e) => setAgencyId(e.target.value)}
        />
        <Button
          onClick={joinAgency}
          disabled={loading || !agencyId || !name}
          className="mt-4"
        >
          {loading ? "Joining Agency..." : "Join Agency"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddTeamMemberDialog;