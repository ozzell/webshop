import { FC, useEffect, useState } from 'react'
import { client, urlFor } from 'lib/client'
import Image from 'next/image'
import { ProductData } from 'types'
import { GetStaticPaths } from 'next/types'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { useStateContext } from 'context/StateContext'
import Product from 'components/Product'
import AddToCart from 'components/AddToCart'
import { handleCheckout } from 'utils/checkout-helpers'

interface ProductDetailsProps {
  product: ProductData
  products: ProductData[]
}
const ProductDetails: FC<ProductDetailsProps> = ({ product, products }) => {
  const { _id, name, price, details, image } = product
  const [index, setIndex] = useState<number>(0)
  const { qty, onAddToCart } = useStateContext()

  useEffect(() => {
    setIndex(0)
  }, [_id])

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            {image && image[index] && (
              <Image
                width="400"
                height="400"
                alt=""
                className="product-detail-image"
                src={urlFor(image[index]).url()}
              />
            )}
          </div>
          <div className="small-images-container">
            {image?.map((image, i) => (
              <Image
                key={image._key}
                width="50"
                height="50"
                alt=""
                className={i === index ? 'small-image selected-image' : 'small-image'}
                onMouseEnter={() => setIndex(i)}
                src={urlFor(image).url()}
              />
            ))}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details</h4>
          <p>{details}</p>
          <p className="price">{price} €</p>
          <div className="quantity">
            <h4>Quantity:</h4>
            <AddToCart />
          </div>
          <div className="buttons">
            <button className="add-to-cart" onClick={() => onAddToCart(product, qty)}>
              Add to Cart
            </button>
            <button
              className="buy-now"
              onClick={() => handleCheckout([{ ...product, quantity: 1 }])}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className="maylike-products-wrapper">
        {/* Accessibility issue */}
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((product) => (
              <Product key={product._id} {...product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }`
  const products = await client.fetch(query)

  const paths = products.map((product: ProductData) => ({
    params: { slug: product.slug.current }
  }))

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = async ({ params: { slug } }: { params: { slug: string } }) => {
  const productQuery = `*[_type == "product" && slug.current == "${slug}"][0]`
  const productsQuery = `*[_type == "product"]`
  const product = await client.fetch(productQuery)
  const products = await client.fetch(productsQuery)
  return {
    props: {
      product,
      products
    }
  }
}

export default ProductDetails
