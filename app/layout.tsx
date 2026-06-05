import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'LearnOS — Student Dashboard',
  description: 'Track your learning progress',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-[#060608] text-white antialiased font-syne">{children}</body>
    </html>
  )
}
