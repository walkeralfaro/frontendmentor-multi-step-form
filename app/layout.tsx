import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"]
})

export const metadata: Metadata = {
  title: "Multi Step Form",
  description: "Multi Step Form",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ubuntu.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
