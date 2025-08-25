import Header from "@/components/common/header"
import type { Metadata } from "next"
import { DM_Sans, DM_Serif_Display } from "next/font/google"
import "./globals.css"

const fontSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"]
})

const fontSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-serif"
})

export const metadata: Metadata = {
  title: "Merito App",
  description: "track your testimonials",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={` ${fontSans.className} ${fontSerif.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  )
}
