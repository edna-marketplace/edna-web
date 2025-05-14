'use client'

import { Toaster } from 'sonner'
import type { AppProps } from 'next/app'

import { AppLayout } from '../layouts/app'
import { globalStyles } from '../styles/global'
import { AuthLayout } from '@/layouts/auth'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthLayout>
      <Toaster richColors position="top-right" />
      <Component {...pageProps} />
    </AuthLayout>
  )
}
