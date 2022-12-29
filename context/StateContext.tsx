import { createContext, ReactNode, SetStateAction, useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { CartProduct, ProductData } from 'types'

interface ContextProps {
  showCart: boolean
  cartItems: CartProduct[]
  totalPrice: number
  totalQuantities: number
  qty: number
  setQty: (prevQty: SetStateAction<number>) => void
  onAddToCart: (product: ProductData, quantity: number) => void
  setShowCart: (showCart: boolean) => void
  incCartItemQty: (cartProduct: CartProduct) => void
  decCartItemQty: (cartProduct: CartProduct) => void
  removeItemFromCart: (cartProduct: CartProduct) => void
}

const Context = createContext<ContextProps | Record<string, never>>({})

export const StateContext = ({ children }: { children: ReactNode }) => {
  const [showCart, setShowCart] = useState<boolean>(false)
  const [cartItems, setCartItems] = useState<CartProduct[]>([])
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const [totalQuantities, setTotalQuantities] = useState<number>(0)
  const [qty, setQty] = useState<number>(1)

  const toggleProductInCart = (product: ProductData, quantity: number) => {
    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity)
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity)

    const checkProductInCart = cartItems.find((item) => item._id === product._id)

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) {
          return { ...cartProduct, quantity: cartProduct.quantity + quantity }
        }
        return cartProduct
      })
      setCartItems(updatedCartItems)
    } else {
      setCartItems([...cartItems, { ...product, quantity }])
    }
  }

  const onAddToCart = (product: ProductData, quantity = 1) => {
    toggleProductInCart(product, quantity)
    toast.success(`${qty} ${product.name} added to cart`)
  }

  const incCartItemQty = (cartProduct: CartProduct) => {
    toggleProductInCart(cartProduct, 1)
  }

  const decCartItemQty = (cartProduct: CartProduct) => {
    if (cartProduct.quantity - 1 > 0) toggleProductInCart(cartProduct, -1)
  }

  const removeItemFromCart = (cartProduct: CartProduct) => {
    setCartItems(cartItems.filter((item) => item._id !== cartProduct._id))
    setTotalPrice((prevTotalPrice) => prevTotalPrice - cartProduct.price * cartProduct.quantity)
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - cartProduct.quantity)
  }

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        setQty,
        onAddToCart,
        setShowCart,
        incCartItemQty,
        decCartItemQty,
        removeItemFromCart
      }}>
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => {
  return useContext(Context)
}
