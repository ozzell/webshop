import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BannerData } from 'types'
import { urlFor } from 'pages/api/sanity-client'

// @ TODO image size issue
const HeroBanner: FC<BannerData> = ({
  _id,
  smallText,
  midText,
  largeText1,
  image,
  product,
  buttonText,
  desc
}) => {
  if (!_id) {
    return null
  }

  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{smallText}</p>
        <h3>{midText}</h3>
        <h4>{largeText1}</h4>
        {image && (
          <Image
            width="450"
            height="450"
            src={urlFor(image).url()}
            alt="headphones"
            className="hero-banner-image"
            priority
          />
        )}
        <div>
          {/* @ TODO button inside a link accessibility issue */}
          <Link href={`/product/${product}`}>
            <button>{buttonText}</button>
          </Link>
          <div className="desc">
            <h5>Descriptions</h5>
            <p>{desc}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner
