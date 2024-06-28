import React from "react";
import {
  Table,
  TableBody,
  TableCell,
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
  createdAt: Date;
};

const ClientTable = ({ client }: { client: Client[] }) => {
  const clients: formClient[] = client.map((client) => ({
    name: client.name,
    email: client.email,
    createdAt: client.createdAt,
  }));
  return (
    <Table className="z-1">
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
                Add Email
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ClientTable;
