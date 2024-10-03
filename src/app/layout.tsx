'use client'

import './globals.css'
import { Inter } from 'next/font/google'
import Header from './components/Header'
import Footer from './components/Footer'
import { useEffect } from 'react'
import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (GA_MEASUREMENT_ID) {
      const url = pathname + searchParams.toString()
      pageview(GA_MEASUREMENT_ID, url)
    }
  }, [pathname, searchParams, GA_MEASUREMENT_ID])

  return (
    <html lang="en">
      <head>
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className={`${inter.className} bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}

// Google Analytics pageview function
function pageview(GA_MEASUREMENT_ID: string, url: string) {
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  })
}