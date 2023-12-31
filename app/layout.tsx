import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NavBar from './NavBar'
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import './theme-config.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
 })

export const metadata: Metadata = {
  title: 'Issue Tracker App',
  description: 'Issue Tracker App build with MySQL, Prisma, NextJS, Tailwind',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.variable}>
        <Theme>
          <NavBar />
          <main className='p-5'>
            {children}
          </main>
        </Theme>
      </body>
    </html>
  )
}
