import React from "react";
import ClientHeader from "./ClientHeader";

const ClientWelcome = ({ client }: { client: Client }) => {
  return (
    <div>
      <ClientHeader
        banner={client.bannerUrl}
        companyName={client.companyName}
        active="home"
      />
      <div className="mt-32">
        <h1>Welcome {client.name}</h1>
      </div>
    </div>
  );
};

export default ClientWelcome;
