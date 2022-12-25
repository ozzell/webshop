import React, { FC } from 'react'
import { client } from 'lib/client'
import FooterBanner from 'components/FooterBanner'
import HeroBanner from 'components/HeroBanner'
import { Banner, Product } from 'types'

interface HomeProps {
  productsData: Product[]
  bannerData: Banner[]
}

const Home: FC<HomeProps> = ({ productsData, bannerData }) => {
  return (
    <>
    <HeroBanner {...bannerData[0]} />
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>

      <div className="products-container">
        {productsData
          ?.map((product) => product.name)
          .join(', ')}
      </div>

      <FooterBanner />
    </>
  )
}

export const getServerSideProps = async () => {
  const productQuery = '*[_type == "product"]'
  const productsData = await client.fetch(productQuery)

  const bannerQuery = '*[_type == "banner"]'
  const bannerData = await client.fetch(bannerQuery)

  return {
    props: {
      productsData,
      bannerData,
    }
  }
}

export default Home