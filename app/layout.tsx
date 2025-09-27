import type { Metadata } from 'next'
import './globals.css'
import { AppShell } from './components/layout/app-shell'
import { Header } from './components/layout/header'

export const metadata: Metadata = {
  title: 'TokenProp Tours - Generate & Tokenize Real Estate Video Tours Instantly',
  description: 'Enable real estate professionals to quickly generate branded video tours with tokenized asset integration for fractional ownership promotion.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-[hsl(20,10%,98%)]">
        <AppShell
          header={<Header />}
        >
          {children}
        </AppShell>
      </body>
    </html>
  )
}

