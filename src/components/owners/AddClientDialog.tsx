import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ClientForm from "./ClientForm";

const AddClientDialog = ({
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
          <DialogTitle className="text-2xl">Create A New Client</DialogTitle>
          <DialogDescription className="capitalize">
            Please Fill the form below to create a new client.
          </DialogDescription>
        </DialogHeader>

        <ClientForm owner={owner} />
      </DialogContent>
    </Dialog>
  );
};

export default AddClientDialog;
