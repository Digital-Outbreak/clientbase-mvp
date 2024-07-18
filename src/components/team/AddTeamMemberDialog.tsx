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

const AddTeamMemberDialog = ({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) => {
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

        <Input placeholder="Agency Key" />
        <Button>Join Agency</Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddTeamMemberDialog;
