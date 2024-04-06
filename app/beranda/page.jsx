'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { cn } from "@/lib/utils";
import { Produk } from "@/components/products";
import { useContext, useEffect, useState } from "react";
import { CartDialog, CartItems } from "@/app/beranda/layout";
import { createBrowserClient } from "@supabase/ssr";


const Page = () => {
    const tag = ['All', 'ATK', 'EM4', 'Produk Jahe', 'Parfum']
    const {showCart, setShowCart} = useContext(CartDialog);
    const {cartItems, setCartItems} = useContext(CartItems);
    // const data = [
    //     {id: 1, name: 'Susu Etawa', price: 35000, price_one_item: 3500, category: 'Produk Jahe', qty: 1, subtotal: 35000},
    //     {id: 2, name: 'Cukur Twin Blade', price: 12000, price_one_item: 1200, category: 'Other', qty: 1, subtotal: 12000},
    //     {id: 3, name: 'Pensil 2B', price: 2000, price_one_item: 200, category: 'ATK', qty: 1, subtotal: 2000},
    //     {id: 4, name: 'EM4 Pertanian', price: 30000, price_one_item: 3000, category: 'EM4', qty: 1, subtotal: 30000},
    //     {id: 5, name: 'Morabito', price: 15000, price_one_item: 1500, category: 'Parfum', qty: 1, subtotal: 15000},
    //     {id: 6, name: 'Marijos', price: 10000, price_one_item: 1000, category: 'Parfum', qty: 1, subtotal: 10000},
    //     {id: 7, name: 'Bokasi', price: 12000, price_one_item: 1200, category: 'Other', qty: 1, subtotal: 12000},
    //     {id: 8, name: 'Jahe Merah', price: 8000, price_one_item: 800, category: 'Produk Jahe', qty: 1, subtotal: 8000},
    //     {id: 9, name: 'Wenis', price: 9000, price_one_item: 900, category: 'Pengharum', qty: 1, subtotal: 9000},
    //     {id: 10, name: 'EM4 Peternakan', price: 10000, price_one_item: 1000, category: 'EM4', qty: 1, subtotal: 10000},
    // ]
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,);
            const {data: product, error} = await supabase.from('product').select(`*, category(name)`);
            if (error) {
                console.log(error);
            }else{
                setData(product);
                console.log(product);
            }
        }
        fetchProducts();
    }, [])

    return (
        <main className={cn("py-6 max-h-screen pr-4", `${showCart ? 'col-span-8' : 'col-span-11'}`)}>
            <div className="flex justify-between gap-x-4 items-center">
                <input type="text" placeholder="Cari produk" name="searchProduk" className="bg-white w-96 px-4 py-2 rounded-full focus:outline-slate-400 placeholder:text-slate-400" />
                <div className="flex items-center gap-x-8">
                    <FontAwesomeIcon icon={faMoon} fixedWidth className="cursor-pointer bg-slate-50 p-2 rounded-full"/>

                    <span className="font-semibold text-xl">Hello, Admin</span>
                </div>
            </div>
            <ul className="flex max-w-96 gap-x-6 mt-8">
                {tag.map((item, index) => (
                    <li key={index} className={cn('bg-white px-6 py-1 text-nowrap rounded-full shadow-lg hover:bg-slate-200 cursor-pointer', index === 0 ? 'bg-blue-700 text-white font-semibold hover:bg-blue-700' : '')}>{item}</li>
                ))}
            </ul>
            <div className={cn("mt-5 grid gap-x-2 2xl:gap-x-4 pr-2 gap-y-4 2xl:gap-y-8 max-h-[29rem] 2xl:max-h-[48rem] hoverable overflow-y-auto", `${showCart ? 'grid-cols-3 2xl:grid-cols-4' : 'grid-cols-4 2xl:grid-cols-6'}`)}>
                {data.map((item, index) => {
                    return (
                        <Produk key={index} cart={{showCart, setShowCart, cartItems, setCartItems}} data={item}/>
                    )
                })}
            </div>
        </main>
    )
}

export default Page;
