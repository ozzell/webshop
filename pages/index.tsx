import React, { FC } from 'react'
import { client } from 'lib/client'
import { BannerData, ProductData } from 'types'
import FooterBanner from 'components/FooterBanner'
import HeroBanner from 'components/HeroBanner'
import Product from 'components/Product'

interface HomeProps {
  productsData: ProductData[]
  bannerData: BannerData[]
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
          ?.map((product) => <Product key={product._id} {...product} />)}
      </div>

      <FooterBanner {...bannerData[1]} />
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