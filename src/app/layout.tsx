import type { Metadata } from "next";
import "./globals.css";
import "easymde/dist/easymde.min.css";
import { DM_Sans as FontSans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/providers/theme-provider";
import { dark } from "@clerk/themes";
import { Toaster } from "react-hot-toast";

const fontSans = FontSans({
  weight: ["400", "500", "600"],
  style: "normal",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Clientbase - Manage your clients",
  description:
    "Clientbase is a simple client management system that helps you keep track of your clients, their projects, and invoices.",
};

export default function OverallLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <head>
          <script async src="https://cdn.seline.so/seline.js"></script>
        </head>
        <body className={fontSans.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
