import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "PREform NCLEX | Prepare with clarity",
    template: "%s | PREform NCLEX",
  },
  description:
    "A focused learning platform for NCLEX-RN and NCLEX-PN candidates, being built with clinical accuracy and transparent assessment at its core.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
