import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Urbanist, Noto_Sans } from 'next/font/google'
import ModalProvider from '@/providers/modal-provider'
import ToastProvider from '@/providers/toast-provider'

const urban = Urbanist({
  subsets: ['latin'],
  weight: ['400'],
  variable: "--font-urbanist"
})
const noto = Noto_Sans({ 
  subsets: ['latin'], 
weight: ['400'],
variable: "--font-noto" })


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
      <body className={`${urban.variable} ${noto.variable} font-urban`}>
        <ModalProvider></ModalProvider>
        <ToastProvider></ToastProvider>
        <Navbar></Navbar>{children}
        <Footer></Footer>
      </body>
    </html>
  )
}
