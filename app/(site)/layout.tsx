import type { Metadata } from "next";
import { Layout } from "@/components/Layout";
import { Providers } from "../providers";
import "../globals.css";

export const metadata: Metadata = {
  title: "ANH THI - Hóa chất xi mạ và hoàn thiện bề mặt",
  description: "ANH THI chuyên cung cấp các giải pháp hóa chất xi mạ, mạ kẽm, đồng, niken, crôm và hoàn thiện bề mặt kim loại chất lượng cao.",
  icons: {
    icon: "/assets/logo.png",
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
