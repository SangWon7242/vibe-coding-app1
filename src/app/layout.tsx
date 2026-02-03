import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const pretendard = localFont({
  src: "../../node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2",
  display: "swap",
  variable: "--font-pretendard",
  weight: "45 920",
});

export const metadata: Metadata = {
  title: "My Daily Habits - 습관 트래커",
  description:
    "매일 습관을 추적하고 달성률을 확인하세요. 건강한 루틴을 만들어가는 습관 관리 앱입니다.",
  keywords: ["습관", "루틴", "habit tracker", "daily habits", "생산성"],
  openGraph: {
    title: "My Daily Habits - 습관 트래커",
    description: "매일 습관을 추적하고 달성률을 확인하세요.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.className} antialiased`}>{children}</body>
    </html>
  );
}
