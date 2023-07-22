import StyledComponentsRegistry from '../lib/AntdRegistry'
import './globals.css'
import Navigator from '@/components/nav/Navigator';

export default function RootApp({ Component, pageProps }) {

  return (
    <>
      <Navigator />
      <Component {...pageProps} />
    </>
  )
}