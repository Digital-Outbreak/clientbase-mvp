import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { showToast } from "@/lib/utils";

const TeamInviteDialog = ({
  children,
  owner,
}: {
  children: React.ReactNode;
  owner: Owner;
}) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(owner.id);
    showToast("Copied to clipboard");
  };
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl">Invite A New Member</DialogTitle>
          <DialogDescription className="capitalize text-gray-300 leading-6">
            This is Your Secret Agency Key, Share it with your team member, down
            below you can find a loom video on how to join the agency, please
            share that too with your team member.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center mt-4">
          <div className="flex items-center space-x-2">
            <div className="text-gray-300 font-bold">Agency Key:</div>
            <code
              onClick={handleCopy}
              className="text-white font-bold bg-gray-800 p-3 rounded-lg font-mono cursor-pointer select-none hover:bg-gray-700 transition-colors duration-300 ease-in-out "
            >
              {owner.id}
            </code>
          </div>
        </div>
        <h1 className="text-2xl mt-4 font-bold">Walkthrough Video</h1>
        <div
          className="overflow-hidden rounded-md shadow-lg bg-gray-800"
          style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}
        >
          <iframe
            src="https://www.loom.com/embed/50d665e1cd5b4a19a2b4ed52fcd17ca8?sid=b65901b7-8966-4e66-914b-e8e091ea9bd9"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            className=""
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TeamInviteDialog;
