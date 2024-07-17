"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getOwnerBySlug } from "@/lib/db/owner-queries";
import OwnerHeader from "@/components/owners/OwnerHeader";
import OwnerSidebar from "@/components/owners/OwnerSidebar";
import Loading from "@/components/global/loading";
import ClientTable from "@/components/owners/ClientTable";
import { Button } from "@/components/ui/button";
import { Plus, PlusCircle, PlusIcon } from "lucide-react";
import AddClientDialog from "@/components/owners/AddClientDialog";
import { getClientsByOwner } from "@/lib/db/client-queries";

const AgencyHomePage = () => {
  const [owner, setOwner] = useState<Owner>();
  const [clients, setClients] = useState<Client[]>([]);
  const params = useParams();

  useEffect(() => {
    const fetchOwner = async () => {
      const owner = await getOwnerBySlug(params.agency.toString());
      setOwner(owner as Owner);
    };

    const fetchClients = async (ownerI: Owner) => {
      const clients = await getClientsByOwner(ownerI.id);

      setClients(clients as Client[]);
    };

    if (params.agency) {
      fetchOwner();
    }

    if (owner) {
      fetchClients(owner);
    }
  }, [params.agency, owner]);

  return owner ? (
    <div className="flex h-screen">
      {owner && (
        <div className="lg:w-[20%] w-24 fixed h-full">
          <OwnerSidebar owner={owner} active="home" />
        </div>
      )}
      <div className="flex-1 ml-[6rem] lg:ml-[20%]">
        <OwnerHeader className="border-b-2 border-gray-900 border-dotted" />
        <div className="p-4">Analystics Here</div>
      </div>
    </div>
  ) : (
    <div className="h-[90vh] w-screen flex justify-center items-center">
      <Loading />
    </div>
  );
};

export default AgencyHomePage;
