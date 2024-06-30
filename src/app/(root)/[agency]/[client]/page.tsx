"use client";
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

    // Check localStorage for login status
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
        <div>
          <h1>Welcome to {client.name}</h1>
          <p>Here you can see all the details of the client</p>
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
