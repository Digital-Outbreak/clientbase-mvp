import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import AddKanbanCardDialog from "./AddKanbanCardDialog";
import { kanbadAddCardToLane } from "@/lib/db/client-queries";
import { showToast } from "@/lib/utils";

export const predefinedValues = ["Task 1", "Task 2", "Task 3"];
export const lanes = ["Backlog", "ToDo", "In Progress", "Done"];

const AddCard = ({
  addCard,
  client,
}: {
  addCard: (title: string, lane: string, date?: Date) => void;
  client: Client;
}) => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [selectedValue, setSelectedValue] = useState(predefinedValues[0]);
  const [selectedLane, setSelectedLane] = useState(lanes[0]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAddCard = () => {
    setLoading(true);
    const finalTitle = title || selectedValue;
    addCard(finalTitle, selectedLane, selectedDate);
    setTitle("");
    if (selectedDate) {
      kanbadAddCardToLane(
        client,
        selectedLane as "Backlog" | "Todo" | "InProgress" | "Done",
        finalTitle,
        selectedDate
      );
    }
    showToast("Card added successfully");
    setDialogOpen(false);
    setLoading(false);
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
        <Button disabled={loading} onClick={() => setDialogOpen(true)}>
          {loading ? "Adding..." : "Add Card"}
        </Button>
      </AddKanbanCardDialog>
    </div>
  );
};

export default AddCard;
