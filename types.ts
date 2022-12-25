export interface ProductData {
  _id: string
  name: string
  image: string
  slug: {
    current: string
  }
  price: number
}

export interface BannerData {
  _id: string
  smallText: string
  midText: string
  largeText1: string
  largeText2: string
  saleTime: string
  product: string
  buttonText: string
  desc: string
  discount: number
  image: {
    asset: {
      _ref: string
    }
  }
}
