import type { AppProps } from 'next/app';// import './globals.css'
import Navigator from '@/components/nav/Navigator';
import { ConfigProvider, Layout, theme } from 'antd';
import { usePrefersColorScheme } from '@anatoliygatt/use-prefers-color-scheme';
import './globals.css';

export default function RootApp({ Component, pageProps }: AppProps) {
  const isDarkMode = usePrefersColorScheme() == 'dark';

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <Layout style={{height: '100%'}}>
        <Layout.Header style={{paddingInline: 0}}><Navigator /></Layout.Header>
        <Layout.Content><Component {...pageProps} /></Layout.Content>
      </Layout>
    </ConfigProvider>
  )
}