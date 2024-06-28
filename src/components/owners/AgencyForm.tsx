"use client";
import React from "react";
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
import { updateOwner } from "@/lib/db/owner-queries";
import { redirect } from "next/navigation";

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
});

const AgencyForm: React.FC<AgencyFormProps> = ({ user }) => {
  const [companyUrl, setCompanyUrl] = React.useState<string>("" as string);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ownerName: user?.name || "",
      ownerEmail: user?.email || "",
      companyName: "",
      companySlug: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (!companyUrl) return alert("Please upload a company logo.");
    const owner = {
      name: data.ownerName,
      email: data.ownerEmail,
      companyName: data.companyName,
      companySlug: data.companySlug,
      companyIconUrl: companyUrl,
      role: "AGENCY",
    };
    updateOwner(user?.id as string, owner).then((res) => {
      if (res) {
        redirect(`/${owner.companySlug}`);
      }
    });
  };

  const generateSlug = () => {
    if (!form.getValues("companyName")) alert("Please enter a company name.");
    const companyName = form.getValues("companyName");
    const slug = companyName
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^a-z0-9-]/g, "");
    form.setValue("companySlug", slug);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <UploadDropzone
          endpoint="imageUploader"
          className="border-primary border-2 mx-5 py-6 rounded-md"
          appearance={{
            uploadIcon: "text-foreground text-4xl",
            button: "bg-primary text-primary-foreground",
            label: "text-foreground font-bold text-xl",
          }}
          content={{
            label: "Upload Company Logo",
          }}
          onClientUploadComplete={(res) => {
            console.log("Files: ", res);
            setCompanyUrl(res[0].url);
          }}
          onUploadError={(error: Error) => {
            handleError(error);
            alert(`ERROR! ${error.message}`);
          }}
        />
        <div className="flex justify-center gap-5 mx-4">
          <FormField
            control={form.control}
            name="ownerName"
            defaultValue={user?.name || ""}
            render={({ field }) => (
              <FormItem className="w-full ">
                <FormLabel>Your Name</FormLabel>
                <FormControl>
                  <Input
                    className="py-4"
                    placeholder="Enter Your Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.ownerName?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ownerEmail"
            defaultValue={user?.email || ""}
            render={({ field }) => (
              <FormItem className="w-full ">
                <FormLabel>Your E-mail</FormLabel>
                <FormControl>
                  <Input
                    className="py-4"
                    placeholder="Enter Your Email"
                    {...field}
                    disabled
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.ownerEmail?.message}
                </FormMessage>
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 mx-4">
          <FormField
            control={form.control}
            name="companyName"
            defaultValue=""
            render={({ field }) => (
              <FormItem className="w-full ">
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input
                    className="py-4"
                    placeholder="Enter Company Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.companyName?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="companySlug"
            defaultValue=""
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
                      disabled={form.formState.isSubmitting}
                      onClick={generateSlug}
                    >
                      Generate Slug
                    </Button>
                  </div>
                </FormControl>

                <FormMessage>
                  {form.formState.errors.companySlug?.message}
                </FormMessage>
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-center mt-6">
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </Form>
  );
};

export default AgencyForm;
