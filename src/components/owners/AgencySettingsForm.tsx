import Image from "next/image";
import React from "react";
import { z } from "zod";

const formSchema = z.object({
  ownerName: z.string().min(2, {
    message: "Owner name must be at least 2 characters.",
  }),
  ownerEmail: z.string().email({
    message: "Valid email address required.",
  }),
  companyName: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  companySlug: z.string().min(2, {
    message: "Company slug must be at least 2 characters.",
  }),
});

const AgencySettingsForm = ({ owner }: { owner: Owner }) => {
  return (
    <div className="flex items-start flex-col justify-start">
      <div className="flex items-center gap-5">
        <Image
          src={owner.companyIconUrl}
          width={200}
          height={200}
          className="rounded-full border-2 border-gray-900 object-cover h-20 w-20"
          alt={owner.companyName}
        />
        <h1
          className="
            text-4xl
            font-bold
            
        "
        >
          {owner.companyName}
        </h1>
      </div>
    </div>
  );
};

export default AgencySettingsForm;
