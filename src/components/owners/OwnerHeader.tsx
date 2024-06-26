import React from "react";
import logo from "@/../public/logo.svg";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

const OwnerHeader = () => {
  return (
    <div className="p-6 shadow-md flex justify-between">
      <Link
        href="/"
        className="flex justify-center mb-4 hover:opacity-80 transition duration-300 ease-in-out"
      >
        <Image src={logo} alt="logo" width={200} height={200} />
      </Link>
      <nav>
        <Button className="flex justify-center space-x-8 text-white" size="lg">
          Login
        </Button>
      </nav>
    </div>
  );
};

export default OwnerHeader;
