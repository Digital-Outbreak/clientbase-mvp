"use client";
import ClientSidebar from "@/components/clients/ClientSidebar";
import ClientWelcome from "@/components/clients/ClientWelcome";
import { getClientBySlug } from "@/lib/db/client-queries";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ClientPage = () => {
  const [client, setClient] = useState<Client>();

  const params = useParams();

  useEffect(() => {
    const fetchClient = async () => {
      const client = await getClientBySlug(params.client.toString());
      setClient(client as Client);
    };

    if (params.agency) {
      fetchClient();
    }
  }, [params.agency]);

  return (
    client && (
      <div className="flex h-screen">
        <div className="lg:w-[20%] w-24 fixed h-full">
          <ClientSidebar client={client} active="home" />
        </div>
        <div className="flex-1 ml-[6rem] lg:ml-[20%]">
          <ClientWelcome client={client} />
        </div>
      </div>
    )
  );
};

export default ClientPage;
