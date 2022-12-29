import { urlFor } from 'lib/client'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { BannerData } from 'types'

const FooterBanner: FC<BannerData> = ({
  _id,
  discount,
  largeText1,
  largeText2,
  saleTime,
  smallText,
  midText,
  desc,
  product,
  buttonText,
  image
}) => {
  if (!_id) {
    return null
  }
  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          <p>{discount}</p>
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <p>{saleTime}</p>
        </div>
        <div className="right">
          <h3>{smallText}</h3>
          <p>{midText}</p>
          <p>{desc}</p>
          {/* @ TODO button inside a link accessibility issue */}
          <Link href={`/product/${product}`}>
            <button>{buttonText}</button>
          </Link>
        </div>
        {image && (
          <Image
            width="555"
            height="555"
            src={urlFor(image).url()}
            alt={product}
            className="footer-banner-image"
          />
        )}
      </div>
    </div>
  )
}

export default FooterBanner
