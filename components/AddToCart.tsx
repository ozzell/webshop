import { FC } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { useStateContext } from 'context/StateContext'
import { CartProduct } from 'types'

interface AddToCartProps {
  cartProduct?: CartProduct
  usedInCart?: boolean
}

// @ TODO Remove ´qty´ from global state and make component
// that wraps AddToCart and the add to cart button with their own
// local state.

/** This component has two modes: local and global.
 *
 * `usedInCart` true means the component updates quantity for a specific product in the cart.
 * `usedInCart` false means the component updates the quantity in the local `qty` state only.
 */
const AddToCart: FC<AddToCartProps> = ({ cartProduct, usedInCart = false }) => {
  const { qty, setQty, incCartItemQty, decCartItemQty } = useStateContext()

  const incQty = () => setQty((prevQty: number) => prevQty + 1)
  const decQty = () => setQty((prevQty) => (prevQty - 1 < 1 ? 1 : prevQty - 1))

  if (usedInCart && cartProduct) {
    return (
      <div className="quantity-desc">
        <button
          disabled={cartProduct.quantity <= 1}
          className="minus"
          onClick={() => decCartItemQty(cartProduct)}>
          <AiOutlineMinus />
        </button>
        <span className="num" aria-label="Quantity">
          {cartProduct.quantity}
        </span>
        <button className="plus" onClick={() => incCartItemQty(cartProduct)}>
          <AiOutlinePlus />
        </button>
      </div>
    )
  }
  return (
    <div className="quantity-desc">
      <button disabled={qty <= 1} className="minus" onClick={decQty} aria-label="Decrease quantity">
        <AiOutlineMinus />
      </button>
      <span className="num" aria-label="Quantity">
        {qty}
      </span>
      <button className="plus" onClick={incQty} aria-label="Increase quantity">
        <AiOutlinePlus />
      </button>
    </div>
  )
}

export default AddToCart
