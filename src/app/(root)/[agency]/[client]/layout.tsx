"use client";
import ClientSidebar from "@/components/clients/ClientSidebar";
import LoginPage from "@/components/clients/loginPage";
import Loading from "@/components/global/loading";

import { getClientBySlug } from "@/lib/db/client-queries";
import { useParams } from "next/navigation";
import React, { useEffect, useState, ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  const [client, setClient] = useState<Client>();
  const [loggedIn, setLoggedIn] = useState(false);

  const params = useParams();

  useEffect(() => {
    const fetchClient = async () => {
      const client = await getClientBySlug(params.client.toString());
      setClient(client as Client);
    };

    if (params.client) {
      fetchClient();
    }

    if (client) {
      const storedLoginStatus = localStorage.getItem(
        `${client?.clientSlug}-loggedIn`
      );
      if (storedLoginStatus === "true") {
        setLoggedIn(true);
      }
    }
  }, [params.client, client]);

  useEffect(() => {
    if (!client) return;
    localStorage.setItem(`${client?.clientSlug}-loggedIn`, loggedIn.toString());
  }, [loggedIn, client]);

  if (!client) {
    return (
      <div className="h-[90vh] w-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  if (!loggedIn) {
    return <LoginPage client={client} setLoggedIn={setLoggedIn} />;
  }

  return <div>{children}</div>;
};

export default RootLayout;
