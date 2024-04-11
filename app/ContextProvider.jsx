'use client'
import { createContext, useState, useEffect } from "react";
import { SideNav } from "@/components/nav";


const CartDialog = createContext(null);
const CartItems = createContext(null);
const Buyer = createContext(null);
export { CartDialog, CartItems, Buyer };


const ContextProvider = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [pembeli, setPembeli] = useState(null);
    useEffect(() => {
        const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(existingCartItems);
    }, []);

    return (
        <>
            <div className="h-fit grid grid-cols-12 w-full bg-slate-200">
                <SideNav />
                <CartDialog.Provider value={{ showCart, setShowCart }}>
                    <CartItems.Provider value={{ cartItems, setCartItems }}>
                        <Buyer.Provider value={{ pembeli, setPembeli }}>
                            {children}
                        </Buyer.Provider>
                    </CartItems.Provider>
                </CartDialog.Provider>
            </div>
        </>
    )
}

export default ContextProvider;