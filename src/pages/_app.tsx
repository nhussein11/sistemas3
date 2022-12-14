import '../frontend/styles/globals.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/themes/fluent-light/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { RecoilRoot } from 'recoil'
import NavBar from '../frontend/components/NavBar'
function MyApp ({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient())
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <NavBar/>
        <Component {...pageProps} />
      </QueryClientProvider>
    </RecoilRoot>
  )
}

export default MyApp
