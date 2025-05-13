'use client'

import { Toaster } from 'sonner'
import type { AppProps } from 'next/app'

import { AppLayout } from '../layouts/app'
import { globalStyles } from '../styles/global'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppLayout>
      <Toaster richColors position="top-right" />
      <Component {...pageProps} />
    </AppLayout>
  )
}
