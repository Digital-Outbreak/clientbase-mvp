import Image from "next/image";
import React from "react";

const ClientWelcome = ({ client }: { client: Client }) => {
  return (
    <div>
      <Image
        src={client.bannerUrl}
        alt={client.clientCompany}
        width={1200}
        height={400}
        className="object-cover w-full h-96

        "
      />
    </div>
  );
};

export default ClientWelcome;
