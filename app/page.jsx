'use client'
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import { useContext, useEffect, useState } from "react";
import { CartDialog, CartItems } from "@/app/ContextProvider";
import { TopNav } from "@/components/nav";
import { getAllProducts, getAllTag, getTagProducts } from "@/components/supabase";

const ProdukCard = dynamic(() => import('@/components/products components/products-card'), { ssr: false });
const ProductsLoader = dynamic(() => import('@/components/products components/products-loader'));
const ErrorLoadProducts = dynamic(() => import('@/components/products components/products-errorload'));
const Cart = dynamic(() => import('@/components/cart'));

export default function Home() {
    const { showCart, setShowCart } = useContext(CartDialog);
    const { cartItems, setCartItems } = useContext(CartItems);
    const [tag, setTag] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [currentTag, setCurrentTag] = useState('All');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const products = await getAllProducts()
                const category = await getAllTag(limit=4)
                setData(products)
                setTag(category)
                console.log(products)
            } catch (error) {
                setError(error)
            }            
            setIsLoading(false)
        }
        fetchData()
    }, [])

    const tagHandler =async(e)=>{
        let tagData
        if (e==='All') {
            tagData = await getAllProducts()
        }else{
            tagData = await getTagProducts(e)
        }
        setData(tagData)
    }

    return (
        <>
            <main className={cn("p-2 h-screen transition-all duration-500 ease-in-out", `${showCart ? 'col-span-8' : 'col-span-11'}`)}>
                <TopNav cartItems={cartItems} setShowCart={setShowCart}/>
                <div className="flex w-full gap-x-4 lg:gap-x-6 mt-8">
                        <button className={cn('bg-white px-6 py-1 text-nowrap rounded-full shadow-lg hover:bg-slate-200 cursor-pointer', currentTag === 'All' ? 'bg-blue-700 text-white font-semibold hover:bg-blue-700' : '')} onClick={(e)=>{setCurrentTag(e.target.innerText); tagHandler('All')}}>All</button>
                        {tag.map((item) => (
                            <button key={item.id} className={cn('bg-white px-6 py-1 text-nowrap rounded-full shadow-lg hover:bg-slate-200 cursor-pointer', item.name === currentTag ? 'bg-blue-700 text-white font-semibold hover:bg-blue-700' : '')} onClick={(e)=> {setCurrentTag(e.target.innerText); tagHandler(item.id)}}>{item.name}</button>
                        ))}
                </div>
                <div className={cn("mt-5 grid gap-x-2 2xl:gap-4 pr-2 gap-y-4 h-4/5 2xl:max-h-[48rem] hoverable overflow-y-scroll", `${showCart ? 'grid-cols-3 2xl:grid-cols-4' : 'grid-cols-4 2xl:grid-cols-6'}`)}>
                    {error ? (
                        <div className={showCart ? 'col-span-3 2xl:col-span-4' : 'col-span-4 2xl:col-span-6'}>
                            <ErrorLoadProducts error={error}/>
                        </div>
                    ) : isLoading ? (
                        [...Array(4)].map((_, index) => (
                            <ProductsLoader key={index} />
                        ))
                    ) : (data.map((item) => {
                        return (
                            <ProdukCard key={item.id} cart={{ showCart, setShowCart, cartItems, setCartItems }} data={item} />
                        )
                    }))}
                </div>
            </main>
            <Cart />
        </>

    )
}
