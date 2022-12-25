import Image from 'next/image'
import Link from 'next/link'

const HeroBanner = () => {
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">SMALL TEXT</p>
        <h3>MID TEXT</h3>
        <Image src="" alt="headphones" className="hero-banner-image" />
        <div>
          <Link href="/product/ID">
            <button>BUTTON TEXT</button>
          </Link>
          <div className="desc">
            <h5>Descriptions</h5>
            <p>DESCRIPTION TEXT</p>
          </div>
        </div>
      </div>
    </div>
    )
}

export default HeroBanner