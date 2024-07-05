"use client";
import ClientHeader from "@/components/clients/ClientHeader";
import ClientImportantLinks from "@/components/clients/ClientImportantLinks";
import { getClientBySlug } from "@/lib/db/client-queries";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ImportantLinks = () => {
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
      <div className="pb-8">
        <ClientHeader
          banner={client.bannerUrl}
          companyName={client.companyName}
          active="important-links"
        />
        <div className="mt-24">
          <ClientImportantLinks client={client} />
        </div>
      </div>
    )
  );
};

export default ImportantLinks;
