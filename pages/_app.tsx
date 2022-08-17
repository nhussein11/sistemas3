import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { QueryClient, QueryClientProvider } from 'react-query'

function MyApp ({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default MyApp
