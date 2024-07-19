import React, { useEffect, useState } from "react";
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
import { Owner } from "@prisma/client";
import { getOwnerWithTeamMembers } from "@/lib/db/owner-queries";

type formClient = {
  name: string;
  email: string;
  companySlug: string;
  clientslug: string;
  createdAt: Date;
};

const TeamTable = ({ owner }: { owner: Owner }) => {
  const [teamMembers, setTeamMembers] = useState<[]>([]);
  useEffect(() => {
    const fetchOwner = async () => {
      const teamMember = await getOwnerWithTeamMembers(owner.id);
      setTeamMembers(teamMember.teamMembers as []);
    };
    fetchOwner();
  }, []);
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
        {teamMembers.map((member: formClient) => (
          <TableRow key={member.email}>
            <TableCell>{member.name}</TableCell>
            <TableCell>{member.email}</TableCell>
            <TableCell>
              <Moment fromNow>{member.createdAt}</Moment>
            </TableCell>
            <TableCell className="flex flex-col md:flex-row gap-3">
              <Link href={`/owners/${owner.id}/team/${member.clientslug}`}>
                <Button variant="outline" className="border-purple-600 w-full">
                  Settings
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TeamTable;
