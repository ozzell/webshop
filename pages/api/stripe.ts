import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import { CartProduct } from 'types'
import { SANITY_PROJECT_ID, SANITY_DATA_SET } from 'ecommerce/sanity.config'

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2020-08-27'
})

const getErrorMsg = (error: unknown) => {
  if (error instanceof Error) return error.message
  return String(error)
}

const parseImgString = (imgString: string) =>
  imgString
    .replace('image-', `https://cdn.sanity.io/images/${SANITY_PROJECT_ID}/${SANITY_DATA_SET}/`)
    .replace('-webp', '.webp')
    .replace('-jpg', '.jpg')
    .replace('-png', '.png')

interface Data {
  statusCode: number
  message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    try {
      const params = {
        submit_type: 'pay' as Stripe.Checkout.Session.SubmitType,
        mode: 'payment' as Stripe.Checkout.Session.Mode,
        payment_method_types: [
          'card'
        ] as Array<Stripe.Checkout.SessionCreateParams.PaymentMethodType>,
        billing_address_collection: 'auto' as Stripe.Checkout.Session.BillingAddressCollection,
        shipping_options: [
          { shipping_rate: 'shr_1MKgJ9Hcj51bolp8fZolnbmH' },
          { shipping_rate: 'shr_1MKgKPHcj51bolp8PhHq10CF' }
        ],
        line_items: req.body.map((item: CartProduct) => {
          const imgString = item.image[0].asset._ref
          const newImage = parseImgString(imgString)
          return {
            price_data: {
              currency: 'eur',
              product_data: {
                name: item.name,
                images: [newImage]
              },
              unit_amount: item.price * 100
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1
            },
            quantity: item.quantity
          }
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/?canceled=true`
      }

      const session = await stripe.checkout.sessions.create(params)
      res.status(200).json({ statusCode: 200, message: session.id })
    } catch (error) {
      res.status(500).json({ statusCode: 500, message: getErrorMsg(error) })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
