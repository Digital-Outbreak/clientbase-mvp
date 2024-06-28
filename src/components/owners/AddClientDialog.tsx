import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import ClientForm from "./ClientForm";

const AddClientDialog = ({
  children,
  owner,
}: {
  children: React.ReactNode;
  owner: Owner;
}) => {
  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent
        className={"lg:max-w-screen-lg  overflow-y-scroll max-h-screen"}
      >
        <SheetHeader>
          <SheetTitle className="text-2xl">Create A New Client</SheetTitle>
          <SheetDescription className="capitalize">
            Please Fill the form below to create a new client.
          </SheetDescription>
        </SheetHeader>

        <ClientForm owner={owner} />
      </SheetContent>
    </Sheet>
  );
};

export default AddClientDialog;
