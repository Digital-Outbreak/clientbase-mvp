import React from "react";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { lanes } from "./AddCard";
import { DatePickerUI } from "@/components/ui/DatePickerUI";
const AddKanbanCardDialog = ({ children }: { children: React.ReactNode }) => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="lg:max-w-screen-lg overflow-y-scroll max-h-screen">
        <DialogHeader>
          <DialogTitle className="text-2xl">Add Card</DialogTitle>
          <DialogDescription className="capitalize">
            Please fill out the form below to add a new card
          </DialogDescription>
        </DialogHeader>
        <Input placeholder="Enter card title" />
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Default Lane" />
          </SelectTrigger>
          <SelectContent>
            {lanes.map((lane) => (
              <SelectItem value={lane} key={lane}>
                {lane}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <DatePickerUI date={date} setDate={setDate} />
        <DialogFooter>
          <DialogClose>
            <Button variant="destructive">Cancel</Button>
          </DialogClose>
          <Button className="ml-2" type="button">
            Add Card
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddKanbanCardDialog;
