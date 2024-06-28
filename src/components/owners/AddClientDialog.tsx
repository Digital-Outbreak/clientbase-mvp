import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ClientForm from "./ClientForm";

const AddClientDialog = ({ children }: { children: React.ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Create A New Client</DialogTitle>
          <DialogDescription className="capitalize">
            Please Fill the form below to create a new client.
          </DialogDescription>
        </DialogHeader>

        <ClientForm />
      </DialogContent>
    </Dialog>
  );
};

export default AddClientDialog;
