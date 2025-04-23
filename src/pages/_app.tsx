import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'
import { AppLayout } from '../layouts/App'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  )
}
