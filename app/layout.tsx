import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getCMSContent } from "@/lib/cms-data";

export const metadata: Metadata = {
  title: {
    default: "Yasco Couriers | Same Day Couriers in Bradford",
    template: "%s | Yasco Couriers",
  },
  description:
    "Friendly & Professional Same Day Courier Services. Yasco Couriers — fast, reliable, and efficient courier service across Bradford and beyond.",
  keywords:
    "same day courier, Bradford courier, next day delivery, courier service Yorkshire, parcel delivery Bradford",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://www.yascocouriers.co.uk",
    siteName: "Yasco Couriers",
    title: "Yasco Couriers | Same Day Couriers in Bradford",
    description:
      "Fast, reliable, and professional same-day courier services across Bradford and beyond.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yasco Couriers | Same Day Couriers in Bradford",
    description: "Fast, reliable, professional same-day courier services.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const content = getCMSContent();

  return (
    <html lang="en-GB" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Header contact={content.contact} />
        <main>{children}</main>
        <Footer contact={content.contact} />
      </body>
    </html>
  );
}
