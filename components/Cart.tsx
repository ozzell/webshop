import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai'
import { TiDeleteOutline } from 'react-icons/ti'
import { useStateContext } from 'context/StateContext'
import { urlFor } from 'lib/client'
import AddToCart from './AddToCart'

const Cart = () => {
  const cartRef = useRef<HTMLDivElement>(null)
  const { totalPrice, totalQuantities, cartItems, setShowCart, removeItemFromCart } =
    useStateContext()

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button className="cart-heading" onClick={() => setShowCart(false)}>
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>
        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <p>Your shopping bag is empty</p>
            <Link href="/">
              <button onClick={() => setShowCart(false)} className="btn">
                Continue Shopping
              </button>
            </Link>
          </div>
        )}
        <div className="product-container">
          {cartItems.length > 0 &&
            cartItems.map((item) => (
              <div className="product" key={item._id}>
                {item.image && item.image[0] && (
                  <Image
                    width="55"
                    height="55"
                    src={urlFor(item.image[0]).url()}
                    alt=""
                    className="cart-product-image"
                  />
                )}
                <div className="item-desc">
                  <div className="flex top">
                    <span>{item.name}</span>
                    <span>{item.price} €</span>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <AddToCart usedInCart cartProduct={item} />
                    </div>
                    <button className="remove-item" onClick={() => removeItemFromCart(item)}>
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length > 0 && (
          <div className="cart-bottom">
            <div className="total">
              <span>Subtotal</span>
              <span>{totalPrice} €</span>
            </div>
            <div className="btn-container">
              <button className="btn">Pay</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
