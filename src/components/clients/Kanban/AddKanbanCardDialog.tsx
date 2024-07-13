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

const AddKanbanCardDialog = ({
  children,
  title,
  setTitle,
  selectedLane,
  setSelectedLane,
  selectedDate,
  setSelectedDate,
  ontap,
  dialogOpen,
  setDialogOpen,
}: {
  children: React.ReactNode;
  title: string;
  setTitle: (title: string) => void;
  selectedLane: string;
  setSelectedLane: (lane: string) => void;
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  ontap: () => void;
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
}) => {
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="lg:max-w-[50%] overflow-y-scroll max-h-screen">
        <DialogHeader>
          <DialogTitle className="text-2xl">Add Card</DialogTitle>
          <DialogDescription className="capitalize">
            Please fill out the form below to add a new card
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4">
          <Input
            placeholder="Enter card title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Select
            value={selectedLane}
            onValueChange={(value) => setSelectedLane(value)}
          >
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
          <DatePickerUI dateN={selectedDate} setDateN={setSelectedDate} />
        </div>
        <DialogFooter className="flex gap-5">
          <DialogClose asChild>
            <Button variant="outline" className="w-full">
              Cancel
            </Button>
          </DialogClose>
          <Button className="w-full" onClick={ontap}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddKanbanCardDialog;
