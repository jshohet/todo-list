import type { Metadata } from "next";
import "./globals.css";
import Providers from "./components/Providers";

export const metadata: Metadata = {
  title: "To-Do List",
  description: "A simple to-do list",  
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="bg-gradient-to-br from-cyan-500 to-clue-500 dark"
      style={{ colorScheme: "dark" }}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
