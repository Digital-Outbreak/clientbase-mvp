"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AgencyFormProps {
  user: Owner | null;
}

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
  companyIconUrl: z.string().url({
    message: "Valid URL for company icon required.",
  }),
});

const AgencyForm: React.FC<AgencyFormProps> = ({ user }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ownerName: user?.name,
      ownerEmail: user?.email,
      companyName: "",
      companySlug: "",
      companyIconUrl: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // Handle form submission
    console.log(data);
  };

  return <Form></Form>;
};

export default AgencyForm;
