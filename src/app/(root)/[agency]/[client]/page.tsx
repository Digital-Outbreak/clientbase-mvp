"use client";
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
  return client ? (
    <div>
      <LoginPage client={client} />
    </div>
  ) : (
    <div className="h-[90vh] w-screen flex justify-center items-center">
      <Loading />
    </div>
  );
};

export default ClientPage;
