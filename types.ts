interface Image {
  _key: string
  asset: {
    _ref: string
  }
}

export interface ProductData {
  _id: string
  name: string
  image: Image[]
  slug: {
    current: string
  }
  price: number
  details: string
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
  image: Image
}

export interface CartProduct extends ProductData {
  quantity: number
}
