import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-alt",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CRMFinex | Salesforce & AWS Consulting",
    template: "%s | CRMFinex",
  },
  description:
    "Fast, reliable, future-ready Salesforce and AWS solutions. Consulting, integrations, AI automation, and managed support.",
  keywords: [
    "CRMFinex",
    "Salesforce consulting",
    "AWS integrations",
    "AI automation",
    "Apex",
    "Lightning",
    "Lambda",
    "EC2",
    "S3",
  ],
  openGraph: {
    title: "CRMFinex | Salesforce & AWS Consulting",
    description:
      "Fast, reliable, future-ready Salesforce and AWS solutions. Consulting, integrations, AI automation, and managed support.",
    type: "website",
    url: "https://www.crmfinex.com/",
  },
  metadataBase: new URL("https://www.crmfinex.com"),
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${poppins.variable} antialiased font-sans`}>
        {children}
      </body>
    </html>
  );
}
