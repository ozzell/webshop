import { createContext, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { CartProduct, ProductData } from 'types'

const CART_KEY = 'cartItems'

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
  clearCart: () => void
}

const Context = createContext<ContextProps | Record<string, never>>({})

export const StateContext = ({ children }: { children: ReactNode }) => {
  const [showCart, setShowCart] = useState<boolean>(false)
  const [cartItems, setCartItems] = useState<CartProduct[]>([])
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const [totalQuantities, setTotalQuantities] = useState<number>(0)
  const [qty, setQty] = useState<number>(1)

  useEffect(() => {
    const cartItems = localStorage.getItem(CART_KEY)
    if (cartItems) {
      const parsedCartItems = JSON.parse(cartItems)
      setCartItems(parsedCartItems)
      setTotalPrice(
        parsedCartItems.reduce(
          (acc: number, item: CartProduct) => acc + item.price * item.quantity,
          0
        )
      )
      setTotalQuantities(
        parsedCartItems.reduce((acc: number, item: CartProduct) => acc + item.quantity, 0)
      )
    }
  }, [])

  const toggleProductInCart = (product: ProductData, quantity: number) => {
    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity)
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity)

    const productAlreadyInCart = cartItems.find((item) => item._id === product._id)

    if (productAlreadyInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) {
          return { ...cartProduct, quantity: cartProduct.quantity + quantity }
        }
        return cartProduct
      })
      setCartItems(updatedCartItems)
      localStorage.setItem(CART_KEY, JSON.stringify(updatedCartItems))
    } else {
      const updatedCartItems = [...cartItems, { ...product, quantity }]
      setCartItems(updatedCartItems)
      localStorage.setItem(CART_KEY, JSON.stringify(updatedCartItems))
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

  const clearCart = () => {
    setCartItems([])
    setTotalPrice(0)
    setTotalQuantities(0)
    localStorage.removeItem(CART_KEY)
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
        removeItemFromCart,
        clearCart
      }}>
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => {
  return useContext(Context)
}
