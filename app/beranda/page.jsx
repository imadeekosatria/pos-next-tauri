'use client'
import dynamic from "next/dynamic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { cn } from "@/lib/utils";
import { useContext, useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { CartDialog, CartItems } from "@/app/beranda/layout";
import { ShoppingCart } from "@/components/images";

const Produk = dynamic(() => import('@/components/products'), {ssr: false});
const ProductsLoader = dynamic(() => import('@/components/products-loader'));


const Page = () => {
    const tag = ['All', 'ATK', 'EM4', 'Produk Jahe', 'Parfum']
    const {showCart, setShowCart} = useContext(CartDialog);
    const {cartItems, setCartItems} = useContext(CartItems);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,);
            const {data: product, error} = await supabase.from('product').select(`*, category(name)`);
            if (error) {
                console.log(error);
            }else{
                setData(product);
                console.log(product);
                setLoading(false);
            }
        }
        fetchProducts();
    }, [])

    return (
        <main className={cn("py-6 max-h-screen pr-4 transition-all duration-500 ease-in-out", `${showCart ? 'col-span-8' : 'col-span-11'}`)}>
            <div className="flex justify-between gap-x-4 items-center">
                <input type="text" placeholder="Cari produk" name="searchProduk" className="bg-white w-96 px-4 py-2 rounded-full focus:outline-slate-400 placeholder:text-slate-400" />
                <div className="flex items-center gap-x-8">
                    <FontAwesomeIcon icon={faMoon} fixedWidth className="cursor-pointer bg-slate-50 p-2 rounded-full"/>
                    <button className="relative" onClick={()=>{setShowCart(true)}} aria-label="cart">
                        <ShoppingCart/>
                        {cartItems.length > 0 && <span className="absolute -top-2 -right-2 py-0.5 px-2 text-white font-medium rounded-full bg-red-500 text-xs">{cartItems.length}</span>}
                    </button>
                    <span className="font-semibold text-xl">Hello, Admin</span>
                </div>
            </div>
            <ul className="flex max-w-96 gap-x-6 mt-8">
                {tag.map((item, index) => (
                    <li key={index} className={cn('bg-white px-6 py-1 text-nowrap rounded-full shadow-lg hover:bg-slate-200 cursor-pointer', index === 0 ? 'bg-blue-700 text-white font-semibold hover:bg-blue-700' : '')}>{item}</li>
                ))}
            </ul>
            <div className={cn("mt-5 grid gap-x-2 2xl:gap-x-4 pr-2 gap-y-4 2xl:gap-y-8 max-h-[29rem] 2xl:max-h-[48rem] hoverable overflow-y-auto", `${showCart ? 'grid-cols-3 2xl:grid-cols-4' : 'grid-cols-4 2xl:grid-cols-6'}`)}>
                {loading ? (
                    [...Array(4)].map((_, index) => (
                        <ProductsLoader key={index}/>
                    ))
                ): (data.map((item, index) => {
                    return (
                        <Produk key={index} cart={{showCart, setShowCart, cartItems, setCartItems}} data={item}/>
                    )
                }))}
            </div>
        </main>
    )
}

export default Page;
