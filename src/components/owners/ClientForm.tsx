import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UploadDropzone } from "@/lib/uploadthing";
import { handleError } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { defaultBannerUrl, defaultLoomLink } from "@/lib/data";
import { createClient } from "@/lib/db/owner-queries";

const clientFormSchema = z.object({
  clientName: z.string().min(2, {
    message: "Client name must be at least 2 characters.",
  }),
  clientEmail: z.string().email({
    message: "Valid email address required.",
  }),
  clientCompany: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  clientSlug: z.string().min(2, {
    message: "Company slug must be at least 2 characters.",
  }),
  loomVideo: z.string().default(defaultLoomLink).optional(),
  clientPassword: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

const ClientForm = ({ owner }: { owner: Owner }) => {
  const router = useRouter();
  const [clientIconUrl, setClientIconUrl] = useState<string>("");
  const [bannerUrl] = useState<string>(defaultBannerUrl);
  const form = useForm<z.infer<typeof clientFormSchema>>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      clientName: "",
      clientEmail: "",
      clientCompany: "",
      clientSlug: "",
      loomVideo: defaultLoomLink,
      clientPassword: "",
    },
  });

  const generateSlug = () => {
    if (!form.getValues("clientCompany")) {
      alert("Please enter a company name.");
      return;
    }
    const companyName = form.getValues("clientCompany");
    const slug = companyName
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^a-z0-9-]/g, "");
    form.setValue("clientSlug", slug);
  };

  const generatePassword = () => {
    const password = Math.random().toString(36).slice(-8);
    form.setValue("clientPassword", password);
  };

  const onSubmit = async (data: z.infer<typeof clientFormSchema>) => {
    if (!clientIconUrl) {
      alert("Please upload a client logo.");
      return;
    }
    const client = {
      name: data.clientName,
      email: data.clientEmail,
      clientCompany: data.clientCompany,
      clientSlug: data.clientSlug,
      password: data.clientPassword,
      companyName: owner.companyName,
      pfpUrl: clientIconUrl,
      bannerUrl: bannerUrl,
      loom: data.loomVideo || defaultLoomLink,
      ownerId: owner.id,
    };
    try {
      const res = await createClient(client);
      if (res) {
        router.push(`/${owner.companySlug}/${client.clientSlug}`);
      }
    } catch (error: any) {
      handleError(error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <UploadDropzone
          endpoint="imageUploader"
          className="border-primary border-2 py-6 rounded-md"
          appearance={{
            uploadIcon: "text-foreground text-4xl",
            button: "bg-primary text-primary-foreground",
            label: "text-foreground font-bold text-xl",
          }}
          content={{
            label: "Upload Client Logo",
          }}
          onClientUploadComplete={(res) => {
            console.log("Files: ", res);
            setClientIconUrl(res[0].url);
          }}
          onUploadError={(error: Error) => {
            handleError(error);
            alert(`ERROR! ${error.message}`);
          }}
        />
        <FormField
          control={form.control}
          name="clientName"
          render={({ field }) => (
            <FormItem className="w-full ">
              <FormLabel>Your Client Name*</FormLabel>
              <FormControl>
                <Input
                  className="py-4"
                  placeholder="Enter Your Client Name*"
                  {...field}
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.clientName?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="clientEmail"
          render={({ field }) => (
            <FormItem className="w-full ">
              <FormLabel>Your Client E-mail*</FormLabel>
              <FormControl>
                <Input
                  className="py-4"
                  placeholder="Enter Client Your Email*"
                  {...field}
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.clientEmail?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="clientPassword"
          render={({ field }) => (
            <FormItem className="w-full ">
              <FormLabel>Client Password*</FormLabel>
              <FormControl>
                <div className="flex gap-5">
                  <Input
                    className="py-4"
                    placeholder="Enter Client Password"
                    {...field}
                  />
                  <Button
                    type="button"
                    disabled={form.formState.isSubmitting}
                    onClick={generatePassword}
                  >
                    Generate Random
                  </Button>
                </div>
              </FormControl>
              <FormMessage>
                {form.formState.errors.clientPassword?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="clientCompany"
          render={({ field }) => (
            <FormItem className="w-full ">
              <FormLabel>Client Company*</FormLabel>
              <FormControl>
                <Input
                  className="py-4"
                  placeholder="Enter Client Company*"
                  {...field}
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.clientCompany?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="clientSlug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Slug</FormLabel>
              <FormControl>
                <div className="flex gap-5">
                  <Input
                    className="py-4"
                    placeholder="Enter Company Slug"
                    {...field}
                  />
                  <Button
                    type="button"
                    disabled={form.formState.isSubmitting}
                    onClick={generateSlug}
                  >
                    Generate Slug
                  </Button>
                </div>
              </FormControl>
              <FormMessage>
                {form.formState.errors.clientSlug?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="loomVideo"
          render={({ field }) => (
            <FormItem className="w-full ">
              <FormLabel>Loom Video</FormLabel>
              <FormControl>
                <Input
                  className="py-4"
                  placeholder="Enter Loom Video URL"
                  {...field}
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.loomVideo?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <div className="flex justify-center mt-6">
          <Button disabled={form.formState.isSubmitting} type="submit">
            {form.formState.isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ClientForm;
