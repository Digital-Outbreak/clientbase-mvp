"use client";
import ClientHeader from "@/components/clients/ClientHeader";
import dynamic from "next/dynamic";
import ClientSidebar from "@/components/clients/ClientSidebar";
import { getClientBySlug } from "@/lib/db/client-queries";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ClientImportantLinks = dynamic(
  () => import("@/components/clients/ClientImportantLinks"),
  { ssr: false }
);

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
      <div className="flex h-screen">
        <div className="lg:w-[20%] w-24 fixed h-full">
          <ClientSidebar client={client} active="important-links" />
        </div>
        <div className="flex-1 ml-[6rem] lg:ml-[20%]">
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
        </div>
      </div>
    )
  );
};

export default ImportantLinks;