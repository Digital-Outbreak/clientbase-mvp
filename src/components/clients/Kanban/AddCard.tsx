import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import AddKanbanCardDialog from "./AddKanbanCardDialog";

export const predefinedValues = ["Task 1", "Task 2", "Task 3"];
export const lanes = ["Backlog", "ToDo", "In Progress", "Done"];

const AddCard = ({
  addCard,
}: {
  addCard: (title: string, lane: string) => void;
}) => {
  const [title, setTitle] = useState("");
  const [selectedValue, setSelectedValue] = useState(predefinedValues[0]);
  const [selectedLane, setSelectedLane] = useState(lanes[0]);

  const handleAddCard = () => {
    const finalTitle = title || selectedValue;
    addCard(finalTitle, selectedLane);
    setTitle("");
  };

  return (
    <div className="justify-end flex p-5">
      <AddKanbanCardDialog>
        <Button>Add Card</Button>
      </AddKanbanCardDialog>
    </div>
  );
};

export default AddCard;
