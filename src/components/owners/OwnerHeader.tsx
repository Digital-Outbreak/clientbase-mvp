"use client";
import React from "react";
import logo from "@/../public/logo.svg";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";

const OwnerHeader = () => {
  const user = useUser();
  return (
    <div className="p-6 shadow-md flex justify-between z-[999]">
      <Link
        href="/"
        className="flex justify-center mb-4 hover:opacity-80 transition duration-300 ease-in-out"
      >
        <Image src={logo} alt="logo" width={200} height={200} />
      </Link>
      <nav>
        {!user.isSignedIn ? (
          <Button
            className="flex justify-center space-x-8 text-white"
            size="lg"
          >
            <Link href="/sign-up">Sign Up</Link>
          </Button>
        ) : (
          <div className="flex justify-center gap-5">
            <UserButton />
            <Button className="flex justify-center space-x-8 text-white">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </div>
        )}
      </nav>
    </div>
  );
};

export default OwnerHeader;
