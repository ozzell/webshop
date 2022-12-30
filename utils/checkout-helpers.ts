import toast from 'react-hot-toast'
import stripePromise from 'lib/stripe-promise'
import { CartProduct } from 'types'

export const handleCheckout = async (cartItems: CartProduct[]) => {
  const stripe = await stripePromise
  const response = await fetch('/api/stripe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cartItems)
  })
  if (response.status === 500) return
  const data = await response.json()
  toast.loading('Redirecting to checkout...')
  stripe?.redirectToCheckout({ sessionId: data.message })
}
