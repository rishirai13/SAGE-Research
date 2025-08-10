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
  title: "SAGE Research – AI-Powered Educational Research & Learning Platform",
  description:
    "Powered by our revolutionary Tutor AI, SAGE doesn’t just recommend content — it understands each student’s knowledge, identifies their gaps, and guides them on a personalized path to mastery.",
  
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
