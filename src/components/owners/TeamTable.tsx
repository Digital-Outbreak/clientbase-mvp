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
import Link from "next/link";
import { generateCustomSlug } from "@/lib/data";
import { showWIPToast } from "@/lib/utils";

type formClient = {
  name: string;
  email: string;
  companySlug: string;
  clientslug: string;
  createdAt: Date;
};

const TeamTable = () => {
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
        <TableRow>
          <TableCell>Hello</TableCell>
          <TableCell>hello@gmailcom</TableCell>
          <TableCell>
            <Moment fromNow>{new Date().toISOString()}</Moment>
          </TableCell>
          <TableCell
            className="flex flex-col md:flex-row
             gap-3"
          >
            <Link href="">
              <Button variant="outline" className="border-purple-600 w-full">
                Settings
              </Button>
            </Link>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default TeamTable;
