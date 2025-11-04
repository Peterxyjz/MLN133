import type { Metadata } from "next";
import { Inter, Quicksand } from "next/font/google";
import "./globals.css";
import { Chatbot } from "@/components/chat/Chatbot";
import { MusicProvider } from "@/components/MusicProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MLN131 - Dân chủ và Nhà nước XHCN",
  description:
    "Chuyên trang về Nhà nước xã hội chủ nghĩa, dân chủ và các kiến thức liên quan cho sinh viên MLN131.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${quicksand.variable} antialiased`}>
        <MusicProvider>
          {children}
          <Chatbot />
        </MusicProvider>
      </body>
    </html>
  );
}
