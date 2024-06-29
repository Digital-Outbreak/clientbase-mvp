import Image from "next/image";
import React from "react";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import toast from "react-hot-toast";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadDropzone } from "@/lib/uploadthing";
import { handleError } from "@/lib/utils";
import { updateOwner } from "@/lib/db/owner-queries";
import { useRouter } from "next/navigation";

const settingsAgencySchema = z.object({
  ownerName: z.string().min(2, {
    message: "Owner name must be at least 2 characters.",
  }),
  ownerEmail: z.string().email({
    message: "Valid email address required.",
  }),
  companyName: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
});

const AgencySettingsForm = ({ owner }: { owner: Owner }) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof settingsAgencySchema>>({
    resolver: zodResolver(settingsAgencySchema),
    defaultValues: {
      ownerName: owner.name,
      ownerEmail: owner.email,
      companyName: owner.companyName,
    },
  });
  const [companyUrl, setCompanyUrl] = React.useState<string>(
    owner.companyIconUrl
  );

  const onSubmit = (data: z.infer<typeof settingsAgencySchema>) => {
    if (!companyUrl) return alert("Please upload a company logo.");
    const ownerI = {
      name: data.ownerName,
      email: data.ownerEmail,
      companyName: data.companyName,
      companyIconUrl: companyUrl,
      role: owner.role,
    };
    updateOwner(owner.id, ownerI).then((res) => {
      if (res) {
        toast.success("Owner updated successfully.");
      }
    });
  };
  const deleteAgency = () => {};

  return (
    <div className="flex items-start flex-col justify-start ">
      <div className="flex items-center gap-5">
        <Image
          src={owner.companyIconUrl}
          width={200}
          height={200}
          className="rounded-full border-2 border-gray-900 object-cover h-20 w-20"
          alt={owner.companyName}
        />
        <h1 className="text-4xl font-bold">{owner.companyName}</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <UploadDropzone
            endpoint="imageUploader"
            className="border-primary border-2 mx-5 my-5 py-6 rounded-md"
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
          <div className="flex justify-center gap-5">
            <FormField
              control={form.control}
              name="ownerName"
              defaultValue={owner.name}
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
              defaultValue={owner.email}
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
          <FormField
            control={form.control}
            name="companyName"
            defaultValue={owner.companyName}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input
                    className="py-4"
                    placeholder="Enter Your Email"
                    {...field}
                    disabled
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.companyName?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <div className="flex justify-center gap-5 mt-6">
            <Button onClick={deleteAgency} variant="destructive">
              Delete Agency
            </Button>
            <Button type="submit" disabled={form.formState.isLoading}>
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AgencySettingsForm;
