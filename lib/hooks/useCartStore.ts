import {create} from 'zustand';
import { round2 } from '../utils';
import { OrderItem } from '../models/OrderModels';

type Cart = {
    items: OrderItem[]
    itemsPrice: number
    taxPrice: number
    shippingPrice: number
    totalPrice: number
}

const initialState: Cart = {
    items: [],
    itemsPrice: 0,
    taxPrice: 0,
    shippingPrice: 0,
    totalPrice: 0,
}

export const cartStore = create<Cart>(() => initialState)

export default function useCartServices() {
    const { items, itemsPrice, taxPrice , shippingPrice , totalPrice } = cartStore()
    return {
        items,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        increase: (item: OrderItem) => {
            const exist = items.find((el) => el.slug === item.slug)
            const updatedCartItems = exist ? items.map((ele) => ele.slug === item.slug ? { ...exist, qty: exist.qty + 1} : ele) :
             [...items, { ...item, qty: 1}]
             const { itemsPrice , shippingPrice, taxPrice, totalPrice} = 
             calPrice(updatedCartItems)
             cartStore.setState({
                items: updatedCartItems,
                itemsPrice,
                shippingPrice,
                taxPrice,
                totalPrice,
             })
        }
    }
}

const calPrice = (items: OrderItem[]) => {
    const itemsPrice = round2(
        items.reduce((acc,item) => acc + item.price * item.qty, 0),

    ),
    shippingPrice = round2(itemsPrice > 100 ? 0 : 100),
    taxPrice = round2(Number(0.15 * itemsPrice)),
    totalPrice = round2(itemsPrice + shippingPrice + taxPrice)
    return { itemsPrice, shippingPrice, taxPrice, totalPrice }
}