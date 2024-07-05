"use client";
import ClientSidebar from "@/components/clients/ClientSidebar";
import ClientWelcome from "@/components/clients/ClientWelcome";
import LoginPage from "@/components/clients/loginPage";
import Loading from "@/components/global/loading";
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

  return client && <ClientWelcome client={client} />;
};

export default ClientPage;
