import type { Metadata } from 'next'
import localFont from 'next/font/local'

import { ReactNode } from 'react'
import ReactHotToast from '@/components/ReactHotToast'

import './globals.css'

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

type Props = Readonly<{
  children: ReactNode
  params: { lang: string }
}>

export default function RootLayout({ children, params }: Props) {
  return (
    <html lang={params.lang}>
      <body className={myFont.className}>
        {children}
        <div id="modal-root" />
        <ReactHotToast />
      </body>
    </html>
  )
}
