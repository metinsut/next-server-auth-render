import Head from 'next/head'
import Layout from "../components/Layout"
import { wrapper } from '../store/store'
import { checkLogin } from "../store/actions"
import cookie from "cookie"
import 'antd/dist/antd.css'
import '../styles/index.scss'

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Blog App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main>
          <Component {...pageProps} />
        </main>
      </Layout>
    </>
  )
}

App.getInitialProps = async ({ Component, ctx: { store, req } }) => {
  let authToken = null;
  const isServer = typeof window === 'undefined'
  if (isServer) {
    const { token } = cookie.parse(req.headers.cookie || '')
    authToken = token
  }
  if (authToken) {
    await store.dispatch(checkLogin(authToken))
  }
};


export default wrapper.withRedux(App)
