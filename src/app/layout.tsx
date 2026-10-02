import type { Metadata } from "next";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Tour Studio — Give places a voice",
  description: "A personal audio-tour MVP by Chiho Liu. Shape a script, edit your story and explore AI narration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
