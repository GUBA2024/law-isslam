import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const arabicSans = localFont({
  src: "./fonts/DejaVuSans.ttf",
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "المستشار إسلام الغرياني | استشارات قانونية متخصصة",
  description:
    "الموقع الرسمي للمستشار إسلام الغرياني لتقديم الاستشارات القانونية والدفاع عن الحقوق وفق القانون المصري.",
  keywords: ["المستشار إسلام الغرياني", "محامي", "استشارات قانونية", "القانون المصري"],
  openGraph: {
    title: "المستشار إسلام الغرياني",
    description:
      "خبرة قانونية متخصصة في تقديم الاستشارات القانونية والدفاع عن الحقوق وفقًا للقانون المصري.",
    type: "website",
    locale: "ar_EG",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${arabicSans.variable} dark h-full`} suppressHydrationWarning>
      <body className="min-h-full bg-background text-foreground">{children}</body>
    </html>
  );
}
