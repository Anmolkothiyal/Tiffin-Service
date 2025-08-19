import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RTS - Rakshit Tiffin Services | Authentic Indian Meals Delivered",
  description:
    "Fresh, healthy, and affordable Indian meals delivered to your doorstep. Experience authentic flavors with the convenience of modern delivery throughout GTA.",
  keywords:
    "Indian food, tiffin service, Toronto, GTA, home delivery, authentic Indian cuisine",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-16.svg", type: "image/svg+xml", sizes: "16x16" },
    ],
    shortcut: "/favicon.svg",
    apple: "/apple-touch-icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
