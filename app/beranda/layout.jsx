'use client'
import {Cart} from "@/components/cart";
import { Nav } from "@/components/sidenav";
import { createContext, useState, useEffect } from "react";

const CartDialog = createContext(null);
const CartItems = createContext(null);
const Buyer = createContext(null);

export { CartDialog, CartItems, Buyer };

export default function BerandaLayout({ children }) {
    const [showCart, setShowCart] = useState(true);
    const [cartItems, setCartItems] = useState([]);
    const [pembeli, setPembeli] = useState(null);
    useEffect(() => {
        const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(existingCartItems);
    }, []);
    return (
        <div className="h-screen grid grid-cols-12 w-full bg-slate-200">
            <Nav />
            <CartDialog.Provider value={{showCart, setShowCart}}>
                <CartItems.Provider value={{cartItems, setCartItems}}>
                    <Buyer.Provider value={{pembeli, setPembeli}}>
                        {children}
                        <Cart />
                    </Buyer.Provider>
                </CartItems.Provider>
            </CartDialog.Provider>
        </div>
    )
}