import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import Moment from "react-moment";
import { SettingsIcon } from "lucide-react";

type formClient = {
  name: string;
  email: string;
  createdAt: string;
};

const clients: formClient[] = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    createdAt: "2024-02-20T15:45:00Z",
  },
  {
    name: "Michael Johnson",
    email: "michael.johnson@example.com",
    createdAt: "2024-03-10T08:00:00Z",
  },
  {
    name: "Emily Brown",
    email: "emily.brown@example.com",
    createdAt: "2023-04-05T14:20:00Z",
  },
  {
    name: "David Wilson",
    email: "david.wilson@example.com",
    createdAt: "2023-05-12T11:00:00Z",
  },
];

const ClientTable = () => {
  return (
    <Table className="z-[">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Created At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clients.map((client, index) => (
          <TableRow key={index}>
            <TableCell>{client.name}</TableCell>
            <TableCell>{client.email}</TableCell>
            <TableCell>
              <Moment fromNow>{client.createdAt}</Moment>
            </TableCell>
            <TableCell className="flex flex-col md:flex-row gap-3">
              <Button variant="outline">
                <SettingsIcon className="w-6 h-6" />
              </Button>
              <Button variant="outline" className="border-purple-600">
                Add Client
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ClientTable;
