import type { Metadata } from 'next'
import localFont from 'next/font/local'

import { ReactNode, Suspense } from 'react'
import ReactHotToast from '@/components/ReactHotToast'

import './globals.css'
import LanguagueSelector from './LanguagueSelector'
import { Locale } from '@/middleware'
import ReactQueryProvider from '@/components/ReactQueryProvider'

export const metadata: Metadata = {
  title: 'K-학술확산센터 강좌 검색',
  description: 'K-학술확산센터 강좌 검색',
}

const myFont = localFont({
  src: './PretendardVariable.woff2',
  display: 'swap',
  weight: '400 700',
})

export async function generateStaticParams() {
  return [{ lang: 'ko' }, { lang: 'en' }]
}

export type LayoutProps = Readonly<{
  children: ReactNode
  params: { lang: Locale }
}>

export default function RootLayout({ children, params }: LayoutProps) {
  return (
    <html lang={params.lang}>
      <body className={myFont.className}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <Suspense>
          <LanguagueSelector />
        </Suspense>
        <div id="modal-root" />
        <ReactHotToast />
      </body>
    </html>
  )
}
