import { FC, ReactNode } from 'react'
import Head from 'next/head'
import Footer from './Footer'
import Navbar from './Navbar'

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <title>Webshop</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="main-container">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout
