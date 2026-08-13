import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "No Co-op",
  description: "Precision in Darkness",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={playfair.variable}>
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
