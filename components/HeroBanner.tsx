import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'
import { BannerData } from 'types'
import { urlFor } from 'pages/api/sanity-client'

interface HeroBannerProps extends BannerData {
  className?: string
}

// @ TODO image size issue
const HeroBannerComponent: FC<HeroBannerProps> = ({
  className,
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
    <div className={className}>
      <LeftSideContainer>
        <p>{smallText}</p>
        <h3>{midText}</h3>
        <h4>{largeText1}</h4>
        {/* @ TODO button inside a link accessibility issue */}
        <Link href={`/product/${product}`}>
          <button>{buttonText}</button>
        </Link>
      </LeftSideContainer>
      <RightSideContainer>
        {image && (
          <StyledImage
            width="450"
            height="450"
            src={urlFor(image).url()}
            alt="headphones"
            priority
          />
        )}
        <StyledDesc>
          <h5>Description</h5>
          <p>{desc}</p>
        </StyledDesc>
      </RightSideContainer>
    </div>
  )
}

HeroBannerComponent.displayName = 'HeroBanner'

const StyledImage = styled(Image)`
  @media (max-width: 768px) {
    width: 80%;
    height: 80%;
  }
  @media (max-width: 425px) {
    width: 100%;
    height: 100%;
  }
`

const LeftSideContainer = styled.div`
  justify-content: center;

  @media (max-width: 768px) {
    padding: 4.25rem 2.25rem;
  }
`

const RightSideContainer = styled.div`
  align-items: end;
  padding-right: 6.25rem;

  @media (max-width: 768px) {
    padding: 0;
    align-items: start;
  }
`

const StyledDesc = styled.div`
  line-height: 1.3;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 1rem 2.25rem 2.25rem;
  }

  h5 {
    color: #324d67;
    margin-bottom: 0.75rem;
    font-weight: 700;
    font-size: 1rem;
  }

  p {
    color: #5f5f5f;
  }
`

const HeroBanner = styled(HeroBannerComponent)`
  display: flex;
  justify-content: space-between;
  background-color: #dcdcdc;
  border-radius: 15px;
  padding: 4.25rem 6.25rem;

  div {
    display: flex;
    flex-direction: column;
  }

  h3 {
    font-size: 2.5rem;
  }

  h4 {
    font-size: 3.5rem;
  }

  button {
    background-color: #f02d34; // #000
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    font-size: 1.5rem;
    cursor: pointer;
    margin-top: 1rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0;
  }
`

export default HeroBanner
