import type React from "react"
import "./globals.css"
import { Space_Grotesk, Work_Sans } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: '--font-space-grotesk',
})

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: '--font-work-sans',
  weight: ['600', '700', '800'],
  display: 'swap',
})

export const metadata = {
  title: "SAGE Research - Educational Research Platform",
  description:
    "Access thousands of peer-reviewed studies, articles, and resources to enhance your teaching and research.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${workSans.variable}`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
