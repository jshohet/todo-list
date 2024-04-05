import type { Metadata } from "next";
import "./globals.css";
import Providers from "./components/Providers";

export const metadata: Metadata = {
  title: "To-Do List",
  description: "A simple to-do list"  
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="" style={{ colorScheme: "dark" }}>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
