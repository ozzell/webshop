export interface Product {
  name: string
}

export interface Banner {
  smallText: string
  midText: string
  largeText1: string
  product: string
  buttonText: string
  desc: string
  image: {
    asset: {
      _ref: string
      _type: string
    }
  }
}
