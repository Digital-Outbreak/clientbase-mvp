import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import AddKanbanCardDialog from "./AddKanbanCardDialog";

export const predefinedValues = ["Task 1", "Task 2", "Task 3"];
export const lanes = ["Backlog", "ToDo", "In Progress", "Done"];

const AddCard = ({
  addCard,
}: {
  addCard: (title: string, lane: string, date?: Date) => void;
}) => {
  const [title, setTitle] = useState("");
  const [selectedValue, setSelectedValue] = useState(predefinedValues[0]);
  const [selectedLane, setSelectedLane] = useState(lanes[0]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAddCard = () => {
    const finalTitle = title || selectedValue;
    addCard(finalTitle, selectedLane, selectedDate);
    setTitle("");
    setDialogOpen(false); // Close the dialog
  };

  return (
    <div className="justify-end flex p-5">
      <AddKanbanCardDialog
        title={title}
        setTitle={setTitle}
        selectedLane={selectedLane}
        setSelectedLane={setSelectedLane}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        ontap={handleAddCard}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
      >
        <Button onClick={() => setDialogOpen(true)}>Add Card</Button>
      </AddKanbanCardDialog>
    </div>
  );
};

export default AddCard;
