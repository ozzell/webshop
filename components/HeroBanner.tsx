import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from 'lib/client' 
import { Banner } from 'types'

// @ TODO image size issue
const HeroBanner: FC<Banner> = ({ smallText, midText, largeText1, image, product, buttonText, desc }) => {
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{smallText}</p>
        <h3>{midText}</h3>
        <h4>{largeText1}</h4>
        <Image width="555" height="555" src={urlFor(image).width(200).url()} alt="headphones" className="hero-banner-image" />
        <div>
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