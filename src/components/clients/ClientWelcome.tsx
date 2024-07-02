import { Home } from "lucide-react";
import Image from "next/image";
import React from "react";

const ClientWelcome = ({ client }: { client: Client }) => {
  return (
    <div>
      <div className="relative">
        <Image
          src={client.bannerUrl}
          alt={client.clientCompany}
          width={1200}
          height={400}
          className="relative object-cover w-[98%] h-48 mt-3 mx-auto rounded-lg"
        />
        <div className="absolute -bottom-20 w-full h-full flex justify-center items-end">
          <div className="flex flex-col justify-center items-center">
            <div className="bg-purple-950 w-32 h-32 flex justify-center items-center rounded-full">
              <Home size={64} />
            </div>
            <h1 className="text-white text-3xl font-semibold text-center mt-2">
              Welcome 👋
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientWelcome;
