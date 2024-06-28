"use url";
import { z } from "zod";

const clientFormScehma = z.object({
  clientName: z.string().min(2, {
    message: "Client name must be at least 2 characters.",
  }),
  clientEmail: z.string().email({
    message: "Valid email address required.",
  }),
  clientCompany: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  loomVideo: z
    .string()
    .url({
      message: "Valid URL required.",
    })
    .optional(),

  clientPassword: z.string().min(6, {
    message: "Password must be at least 5 characters.",
  }),
});

const ClientForm = ({ owner }: { owner: Owner }) => {
  return "r";
};

export default ClientForm;
