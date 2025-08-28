import Footer from "@/components/common/footer"
import { Toaster } from "@/components/ui/sonner"
import type { Metadata } from "next"
import { ClerkProvider} from '@clerk/nextjs'
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
    <ClerkProvider>
      <html lang="en">
        <body
          className={` ${fontSans.className} ${fontSerif.variable} antialiased`}
        >
        {children}
        <Toaster position="top-right" />
        <Footer />
        </body>
      </html>
    </ClerkProvider>
  )
}
