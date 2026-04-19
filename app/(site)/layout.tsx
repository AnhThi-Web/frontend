import type { Metadata } from "next";
import { Layout } from "@/components/Layout";
import { Providers } from "../providers";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    default: "ANH THI - Hóa chất xi mạ và hoàn thiện bề mặt",
    template: "%s | ANH THI",
  },
  description: "ANH THI chuyên cung cấp các giải pháp hóa chất xi mạ, mạ kẽm, đồng, niken, crôm và hoàn thiện bề mặt kim loại chất lượng cao.",
  keywords: ["hóa chất xi mạ", "mạ kẽm", "mạ niken", "mạ crôm", "hoàn thiện bề mặt kim loại", "anh thi"],
  openGraph: {
    title: "ANH THI - Hóa chất xi mạ và hoàn thiện bề mặt",
    description: "ANH THI chuyên cung cấp các giải pháp hóa chất xi mạ, mạ kẽm, đồng, niken, crôm và hoàn thiện bề mặt kim loại chất lượng cao.",
    url: "/",
    siteName: "ANH THI",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "/assets/congty.jpg",
        width: 1200,
        height: 630,
        alt: "ANH THI Factory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ANH THI - Hóa chất xi mạ và hoàn thiện bề mặt",
    description: "ANH THI chuyên cung cấp các giải pháp hóa chất xi mạ chất lượng cao.",
    images: ["/assets/congty.jpg"],
  },
  icons: {
    icon: "/assets/logo.png",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
