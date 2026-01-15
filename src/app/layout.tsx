import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'TourismAgent Planner',
  description: 'AI-powered vacation planning platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className='bg-gradient-to-br from-orange-400 via-pink-400 to-purple-500 min-h-screen text-white'>
        <Navbar />
        <Sidebar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
