'use client'

import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'
import { AppLayout } from '../layouts/App'
import { Toaster } from 'sonner'
import { AuthLayout } from '@/layouts/Auth'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthLayout>
      <Toaster richColors position="top-right" />
      <Component {...pageProps} />
    </AuthLayout>
  )
}
