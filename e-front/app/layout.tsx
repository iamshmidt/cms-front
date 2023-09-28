import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Urbanist } from 'next/font/google'

const font = Urbanist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Store',
  description: 'Store',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
      <Navbar></Navbar>{children}
      <Footer></Footer>
      </body>
    </html>
  )
}