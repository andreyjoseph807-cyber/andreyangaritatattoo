import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Andrey Angarita Tattoo | Blackwork & Fineline",
  description:
    "Tatuador especializado en blackwork y fine line en Colombia. Diseños personalizados con identidad y estética profesional.",
  keywords: ["tatuajes", "blackwork", "fineline", "tatuador colombia", "andrey angarita"],
  openGraph: {
    title: "Andrey Angarita Tattoo",
    description: "Tatuajes con propósito. Blackwork & Fineline.",
    url: "https://andreyangaritatattoo.vercel.app",
    siteName: "Andrey Angarita Tattoo",
    locale: "es_CO",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}