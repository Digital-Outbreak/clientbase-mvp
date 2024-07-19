"use client";
import React from "react";
import logo from "@/../public/logo.svg";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import AddTeamMemberDialog from "../team/AddTeamMemberDialog";

const OwnerHeader = ({ className }: { className?: string }) => {
  const user = useUser();
  return (
    <div className={`p-6 shadow-md flex justify-between z-[999] ${className}`}>
      <Link
        href="/"
        className="flex justify-center mb-4 hover:opacity-80 transition duration-300 ease-in-out"
      >
        <Image src={logo} alt="logo" width={200} height={200} />
      </Link>
      <nav>
        {!user.isSignedIn ? (
          <Link href="/sign-up">
            <Button
              className="flex justify-center space-x-8 text-white"
              size="lg"
            >
              Sign Up
            </Button>
          </Link>
        ) : (
          user.user.id && (
            <div className="flex justify-center gap-2">
              <AddTeamMemberDialog>
                <Button
                  variant="outline"
                  className="flex justify-center space-x-8 text-white"
                >
                  Join existing Agency
                </Button>
              </AddTeamMemberDialog>
              <UserButton />
              <Link href="/dashboard">
                <Button className="flex justify-center space-x-8 text-white">
                  Dashboard
                </Button>
              </Link>
            </div>
          )
        )}
      </nav>
    </div>
  );
};

export default OwnerHeader;
