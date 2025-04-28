'use client'

import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'
import { AppLayout } from '../layouts/App'
import { Toaster } from 'sonner'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppLayout>
      <Toaster richColors position="top-right" />
      <Component {...pageProps} />
    </AppLayout>
  )
}
