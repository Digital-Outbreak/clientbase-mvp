"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getOwnerBySlug } from "@/lib/db/owner-queries";
import OwnerHeader from "@/components/owners/OwnerHeader";
import OwnerSidebar from "@/components/owners/OwnerSidebar";
import Loading from "@/components/global/loading";
import { getClientsByOwner } from "@/lib/db/client-queries";
import { useAuth } from "@clerk/nextjs";

const AgencyHomePage = () => {
  const router = useRouter();
  const auth = useAuth();
  const [owner, setOwner] = useState<Owner | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const { agency } = useParams();

  useEffect(() => {
    // if (auth.isLoaded && !auth.isSignedIn) {
    //   router.push("/sign-in");
    // }

    const fetchOwner = async () => {
      const owner = await getOwnerBySlug(agency?.toString() || "");
      setOwner(owner as Owner);
    };

    const fetchClients = async (ownerId: string) => {
      const clients = await getClientsByOwner(ownerId);
      setClients(clients as Client[]);
    };

    if (agency) {
      fetchOwner();
    }

    if (owner) {
      fetchClients(owner.id);
    }
  }, [agency, owner]);

  return owner ? (
    <div className="flex h-screen">
      <div className="lg:w-[20%] w-24 fixed h-full">
        <OwnerSidebar owner={owner} active="home" />
      </div>
      <div className="flex-1 ml-[6rem] lg:ml-[20%]">
        <OwnerHeader className="border-b-2 border-gray-900 border-dotted" />
        <div className="p-4">Analytics Here</div>
      </div>
    </div>
  ) : (
    <div className="h-[90vh] w-screen flex justify-center items-center">
      <Loading />
    </div>
  );
};

export default AgencyHomePage;
