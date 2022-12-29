import { createContext, ReactNode, useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { CartProduct, ProductData } from 'types'

interface ContextProps {
  showCart: boolean
  cartItems: CartProduct[]
  totalPrice: number
  totalQuantities: number
  qty: number
  incQty: () => void
  decQty: () => void
  onAdd: (product: ProductData, quantity: number) => void
  setShowCart: (showCart: boolean) => void
}

const Context = createContext<ContextProps | Record<string, never>>({})

export const StateContext = ({ children }: { children: ReactNode }) => {
  const [showCart, setShowCart] = useState<boolean>(false)
  const [cartItems, setCartItems] = useState<CartProduct[]>([])
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const [totalQuantities, setTotalQuantities] = useState<number>(0)
  const [qty, setQty] = useState<number>(1)

  const incQty = () => setQty((prevQty) => prevQty + 1)
  const decQty = () => setQty((prevQty) => (prevQty - 1 < 1 ? 1 : prevQty - 1))

  const onAdd = (product: ProductData, quantity = 1) => {
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
    toast.success(`${qty} ${product.name} added to cart`)
  }

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        setShowCart
      }}>
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => {
  return useContext(Context)
}
