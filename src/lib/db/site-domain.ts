"use server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const readSiteDomain = async (domain: string) => {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  try {
    const { data, error } = await supabase
      .from("Owner")
      .select("*")
      .eq("companySlug", domain);

    if (error) {
      console.error("Error fetching data from Supabase:", error);
      return { error: error.message };
    }

    return data;
  } catch (error: any) {
    console.error("Unexpected error:", error);
    return { error: error.message || "An unexpected error occurred" };
  }
};
