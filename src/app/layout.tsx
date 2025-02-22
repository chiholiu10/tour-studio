import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chatbot",
  description: "Chatbot 2025 released",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
