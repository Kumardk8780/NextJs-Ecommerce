"use client"

import useCartServices from "@/lib/hooks/useCartStore"
import Link from "next/link"
import { useEffect, useState } from 'react'

const Menu = () => {
    const { items } = useCartServices()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <div>
            <ul className="flex items-stretch">
                <li>
                    <Link href="/cart" className="btn btn-ghost rounded-btn">
                        Cart
                        {
                            mounted && items.length != 0 && (
                                <div className="badge badge-secondary">
                                    {items.reduce((a, c) => a + c.qty, 0)}{' '}
                                </div>
                            )
                        }
                    </Link>
                </li>
                <li>
                    <button className="btn btn-ghost rounded-btn" type="button">
                        Sign in
                    </button>
                </li>
            </ul>
        </div>
    )
} 

export default Menu