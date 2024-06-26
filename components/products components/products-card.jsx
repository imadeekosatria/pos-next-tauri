'use client'
import Image from "next/image";
import { Atr, food, ShoppingCart, Package } from "../images";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { formattedPrice } from "@/utils/format";

const ProdukCard = ({ cart, data }) => {
    const [price, setPrice] = useState({harga: data.harga, satuan: data.satuan.pack})
    const [isBoxSelected, setIsBoxSelected] = useState(true);
    const {showCart, setShowCart, cartItems, setCartItems} = cart;
    const handleBoxClick = () => {
        setIsBoxSelected(true);
        setPrice(prevState => ({...prevState, harga: data.harga, satuan: data.satuan.pack}));
    };

    const handleItemClick = () => {
        setIsBoxSelected(false);
        setPrice(prevState => ({...prevState, harga: data.harga_satuan, satuan: data.satuan.satuan}));
    };

    function handleAddToCart() {
        if (!showCart) {
            setShowCart(true);
        }
        const cartItem = {
            id: data.id,
            name: data.nama,
            price: price.harga,
            category: data.category.name,
            satuan: price.satuan,
            qty: 1,
            subtotal: price.harga
        };
        const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        // Check if cartItem already exists in the cart
        const existingCartItem = existingCartItems.find(item => item.id === cartItem.id && item.price === cartItem.price);

        let newCartItems;
        if (existingCartItem) {
            // If it does, increment the count
            existingCartItem.qty++;
            existingCartItem.subtotal = existingCartItem.price * existingCartItem.qty;
            newCartItems = [...existingCartItems];
        } else {
            // If it doesn't, add it to the cart
            newCartItems = [...existingCartItems, cartItem];
        }
        setCartItems(newCartItems);
        localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    }
    return (
        <>
            <div className="bg-white shadow-lg w-full max-h-[19rem] 2xl:max-h-[20rem] rounded-xl p-4 relative animate-slide-up">
                <Image src={food} placeholder="blur" alt="produk1" style={{width: '100%', maxHeight: '8rem', objectFit: "cover"}} className="rounded-lg shadow-lg"/>
                <button aria-label="add to cart" className="bg-blue-700 p-2 rounded-full absolute top-2 right-2 hover:bg-blue-600" onClick={ handleAddToCart }>
                    <ShoppingCart className="fill-slate-50"/>
                </button>
                <div className="mt-4 2xl:mt-8 flex flex-col gap-y-2 ">
                    <div className="flex justify-between font-medium">
                        <span className="text-nowrap text-ellipsis overflow-hidden 2xl:max-w-28">{data.nama}</span>
                        <span>{formattedPrice(price.harga)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span>{data.category.name}</span>
                    </div>
                    <div className="2xl:relative">
                        <div className="2xl:bottom-0 flex gap-x-4 ">
                            <button aria-label="box" className="flex flex-col gap-y-1 items-center text-sm" onClick={handleBoxClick}>
                                <div className={cn("p-2 rounded-full",{'bg-blue-400 hover:bg-blue-300': isBoxSelected, 'bg-slate-100 hover:bg-slate-200':!isBoxSelected})}>
                                    <Package className={cn({"fill-white":isBoxSelected})}/>
                                </div>
                                Box
                            </button>
                            <button aria-label="satuan" className="flex flex-col gap-y-1 items-center text-sm" onClick={handleItemClick}>
                                <div className={cn("p-2 rounded-full", {'bg-blue-400 hover:bg-blue-300': !isBoxSelected, 'bg-slate-100 hover:bg-slate-200': isBoxSelected})}>
                                    <Atr className={cn({'fill-white': !isBoxSelected})}/>
                                </div>
                                Per buah
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProdukCard;