'use client'

import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'
import { AppLayout } from '../layouts/App'
import { Toaster } from 'sonner'
import { AuthLayout } from '@/layouts/Auth'
import { parseCookies } from 'nookies'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  const { '@edna:auth-token': token } = parseCookies()

  const Layout = token ? AppLayout : AuthLayout

  return (
    <Layout>
      <Toaster richColors position="top-right" />
      <Component {...pageProps} />
    </Layout>
  )
}
