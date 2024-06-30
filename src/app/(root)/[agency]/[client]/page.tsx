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
  const [loggedIn, setLoggedIn] = useState(false);

  const params = useParams();

  useEffect(() => {
    const fetchClient = async () => {
      const client = await getClientBySlug(params.client.toString());
      setClient(client as Client);
    };

    if (params.agency) {
      fetchClient();
    }

    const storedLoginStatus = localStorage.getItem("loggedIn");
    if (storedLoginStatus === "true") {
      setLoggedIn(true);
    }
  }, [params.agency]);

  useEffect(() => {
    // Store login status in localStorage
    localStorage.setItem("loggedIn", loggedIn.toString());
  }, [loggedIn]);

  return client ? (
    <div>
      {loggedIn ? (
        <div className="flex h-screen">
          <div className="lg:w-[20%] w-24 fixed h-full">
            <ClientSidebar client={client} active="home" />
          </div>

          <div className="flex-1 ml-[6rem] lg:ml-[20%]">
            <ClientWelcome client={client} />
          </div>
        </div>
      ) : (
        <LoginPage client={client} setLoggedIn={setLoggedIn} />
      )}
    </div>
  ) : (
    <div className="h-[90vh] w-screen flex justify-center items-center">
      <Loading />
    </div>
  );
};

export default ClientPage;
