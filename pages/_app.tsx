import '../styles/globals.css'

import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Layout } from '../components'
import { useInitialSetup } from '../hooks/useInitialSetup'
import { store } from '../store'

export default function App({ Component, pageProps }: AppProps) {
  useInitialSetup(store)

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer />
      </Layout>
    </Provider>
  )
}
