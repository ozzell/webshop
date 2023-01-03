import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from 'pages/api/sanity-client'
import { FC } from 'react'
import { ProductData } from 'types'

const Product: FC<ProductData> = ({ _id, image, name, slug, price }) => {
  if (!_id) {
    return null
  }
  return (
    <div className="product-card">
      <Link href={`/product/${slug.current}`}>
        <div>
          {image && image[0] && (
            <Image
              className="product-image"
              width="250"
              height="250"
              src={urlFor(image[0]).url()}
              alt={name}
            />
          )}
          <p className="product-name">{name}</p>
          <p className="product-price">{price} €</p>
        </div>
      </Link>
    </div>
  )
}

export default Product
