"use client"

import useCartServices from "@/lib/hooks/useCartStore"
import { OrderItem } from "@/lib/models/OrderModels"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function AddToCart({ item }: { item: OrderItem }) {
    const router = useRouter()
    const { items, increase, decrease } = useCartServices()
    const [ existItem, setExistItem ] = useState<OrderItem | undefined>()

    useEffect(() => {
        setExistItem(items.find((el) => el.slug === item.slug))
    }, [item, items])

    const addToCartHandler = () => {
        increase(item)
    }

    return existItem ? (
        <div>
            <button className="btn" type="button" onClick={() => decrease(existItem)}>
                -
            </button>
            <span className="px-2">{existItem.qty}</span>
            <button className="btn" type="button" onClick={() => increase(existItem)}>
                +
            </button>
        </div>
    ) : (
        <button className="btn btn-primary w-full" type="button" onClick={addToCartHandler}>
            Add to cart
        </button>
    )
}
