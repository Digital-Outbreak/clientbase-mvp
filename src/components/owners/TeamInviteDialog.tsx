import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const TeamInviteDialog = ({
  children,
  owner,
}: {
  children: React.ReactNode;
  owner: Owner;
}) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent
        className={"lg:max-w-screen-lg overflow-y-scroll max-h-screen"}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl">Invite A New Member</DialogTitle>
          <DialogDescription className="capitalize text-gray-300 leading-6">
            This is Your Secret Agency Key, Share it with your team member, down
            below you can find a loom video on how to join the agency, please
            share it with your team member.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default TeamInviteDialog;
