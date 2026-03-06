import type { Metadata } from "next";
import { Layout } from "@/components/Layout";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "MITEK VIETNAM - Hóa chất xi mạ và hoàn thiện bề mặt",
  description: "MITEK chuyên cung cấp các giải pháp hóa chất xi mạ, mạ kẽm, đồng, niken, crôm và hoàn thiện bề mặt kim loại chất lượng cao.",
  icons: {
    icon: "https://bizweb.dktcdn.net/100/424/639/themes/823315/assets/favicon.png?1763658688907",
  }
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
