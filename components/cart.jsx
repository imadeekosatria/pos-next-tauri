'use client'
import { CartDialog, CartItems, Buyer } from "@/app/ContextProvider";
import { useContext, useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faTrashCan, faPlus, faMinus, faTicket } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import food from '@/public/images/food.jpg';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button";
import { DialogClose } from "@radix-ui/react-dialog";


import {formattedPrice} from "@/utils/format"

const Cart = () => {
    const { showCart, setShowCart } = useContext(CartDialog);
    const { cartItems, setCartItems } = useContext(CartItems);
    const { pembeli, setPembeli } = useContext(Buyer);

    const [isCheckout, setIscheckout] = useState(false);
    const [subTotal, setSubTotal] = useState(0);
    const [total, setTotal] = useState(0);
    const [discount, setDiscount] = useState(500);
    const formattedDate = new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    const messagesEndRef = useRef(null);

    useEffect(()=>{
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    },[cartItems.length])
    useEffect(() => {
        
        const newTotal = cartItems.reduce((sum, item) => sum + item.subtotal, 0);
        setSubTotal(newTotal);
        setTotal(newTotal - discount);

    }, [cartItems, discount]);


    const handleCheckout = async () => {
        if (pembeli) {
            const data = {
                pembeli: {
                    nama: pembeli.nama || 'Admin',
                    email: pembeli.email || '-',
                    telepon: pembeli.telepon || '-',
                    alamat: pembeli.alamat || '-',
                    tanggal: formattedDate,
                    items: cartItems,
                    total: total,
                }
            }

            try {
                const response = await fetch('http://localhost:3001', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });

                if (!response.ok) throw new Error('Network response was not ok');

                const responseData = await response.json();
                console.log(responseData);
            } catch (error) {
                console.error('Error:', error)
            }
        } else {
            setIscheckout(!isCheckout);
        }
    };
    return (
        <>
            <div className={cn(`${showCart ? 'bg-white w-full col-span-3 h-screen p-2 2xl:p-6 relative animate-slide-down' : 'hidden'}`)}>
                <div className="flex flex-col gap-y-4">
                    <div className="flex justify-between items-center pl-2">
                        <span className="text-2xl font-semibold">Pesanan saat ini</span>
                        <button className="" onClick={() => { setShowCart(!showCart) }}><FontAwesomeIcon icon={faXmark} fixedWidth style={{color:'#0f172a'}} size="xl"/></button>
                    </div>
                    <div className="flex flex-col gap-y-2 text-xs 2xl:text-base font-medium pl-2">
                        <span >Tanggal : {formattedDate}</span>
                        <span >Code : 20240322</span>
                    </div>
                    <div className="2xl:h-[30rem] h-[17rem] overflow-y-auto hoverable py-2 pr-4">
                        {cartItems && cartItems.length > 0 ? (
                            cartItems.map((item, index) => {
                                return (
                                    <CartItem key={index} items={{ item, cartItems, setCartItems }} />
                                )
                            })
                        ) : (
                            <div className="2xl:h-96 flex flex-col justify-center flex-grow">
                                <span className="text-center text-xl font-semibold">Tidak ada item di keranjang</span>
                            </div>
                        )}
                        <div ref={messagesEndRef}></div>
                    </div>
                </div>
                <div className="flex flex-col gap-y-4 w-11/12 rounded-lg absolute bottom-4">
                    {/* <div className="bg-white flex items-center px-1 2xl:px-2 justify-between relative w-full py-0.5 rounded-lg">
                        <FontAwesomeIcon icon={faTicket} size="xl" />
                        <form action="" method="post" className="flex gap-x-2">
                            <input type="text" name="voucher" id="voucher" placeholder="Masukkan kode voucher" className="focus:outline-slate-400 px-2 w-44 2xl:w-72" />
                            <button type="submit" className="bg-blue-700 hover:bg-blue-600 text-white text-xs 2xl:text-base p-1 font-semibold 2xl:font-normal 2xl:px-2 2xl:py-1.5 rounded-md">Gunakan</button>
                        </form>
                    </div> */}
                    <div className="p-2 2xl:p-4 divide-y-2 divide-slate-500 divide-dashed rounded-lg bg-white">
                        <div className="pb-4 flex flex-col gap-y-1.5 2xl:gap-y-2.5">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>{formattedPrice(subTotal)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Diskon</span>
                                <span className="text-red-400">-{formattedPrice(discount)}</span>
                            </div>
                        </div>
                        <div className="flex justify-between pt-4">
                            <span>Total</span>
                            <span>{formattedPrice(total)}</span>
                        </div>
                    </div>
                    <button className="bg-blue-700 p-4 w-full text-2xl text-white font-medium rounded-lg" onClick={handleCheckout}>Cetak Pesanan</button>
                </div>
            </div>
            <DialogCheckout isOpen={{ isCheckout, setIscheckout, setPembeli }} />
        </>
    )
}

const CartItem = ({ items }) => {
    const { item, cartItems, setCartItems } = items;
    const [itemCount, setItemCount] = useState(item.qty);
    const [open, setOpen] = useState(false);

    const updateCount = (delta) => {
        const newCount = itemCount + delta;
        if (newCount > 0) {
            setItemCount(newCount);
            updateCountInLocalStorage(item.id, item.price, newCount);

            // Update cartItems state
            const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            setCartItems(existingCartItems);
        } else {
            setOpen(!open);
        }
    }

    const updateCountInLocalStorage = (id, price, newCount) => {
        const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const existingItem = existingCartItems.find(item => item.id === id && item.price === price);

        if (existingItem) {
            existingItem.qty = newCount;
            existingItem.subtotal = existingItem.price * newCount;
            localStorage.setItem('cartItems', JSON.stringify(existingCartItems));
        }
    }

    // Use updateCount function for plus and minus operations
    const minus = () => updateCount(-1);
    const plus = () => updateCount(1);

    const handleRemove = (id, price) => {
        const newCartItems = cartItems.filter(item => item.id !== id || item.price != price);
        setCartItems(newCartItems);
        localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    }

    useEffect(()=>{
        const updatedItem = cartItems.find(cartItem => cartItem.id === item.id && cartItem.price === item.price);
        if (updatedItem) {
            setItemCount(updatedItem.qty);
        }
    },[cartItems, item.id, item.price])
    return (
        <>
            <div className="shadow-lg relative rounded-lg p-2.5 animate-slide-up mb-4 ">
                <button className="absolute bg-red-500 -top-2 -right-2.5 px-1.5 py-1 2xl:px-2.5 2xl:py-2 rounded-full hover:bg-blue-600" onClick={() => handleRemove(item.id, item.price)}>
                    <FontAwesomeIcon icon={faTrashCan} style={{ color: '#ffffff' }} fixedWidth />
                </button>
                <div className="flex gap-x-3 w-full">
                    <div className="2xl:w-20 w-16">
                        <Image src={food} alt="produk1" style={{ width: '100%' }} className="rounded-xl" />
                    </div>
                    <div className="flex flex-col relative w-full gap-y-2 2xl:gap-y-0">
                        <span className="font-semibold text-sm">{item.name}</span>
                        <span className="text-xs hidden 2xl:block">{item.category}</span>
                        <div className="2xl:absolute 2xl:bottom-0 flex gap-x-3 justify-between items-end w-full">
                            <span className="text-xs 2xl:text-base font-bold text-blue-700">{formattedPrice(item.price)}</span>
                            <div className="flex w-28 justify-between">
                                <button className="bg-slate-300 rounded-md px-1 hover:bg-slate-200"><FontAwesomeIcon icon={faTicket}/></button>
                                <button className="bg-slate-300 rounded-md px-1 hover:bg-slate-200" onClick={minus}><FontAwesomeIcon icon={faMinus} /></button>
                                <span>{itemCount}</span>
                                <button className="bg-blue-700 hover:bg-blue-600 rounded-md px-1" onClick={plus}><FontAwesomeIcon icon={faPlus} style={{ color: '#ffffff' }} /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <DialogDelete isOpen={{ open, setOpen, handleRemove }} item={{ id: item.id, price: item.price }} />
        </>
    )
}


const DialogDelete = ({ isOpen, item }) => {
    const { open, setOpen, handleRemove } = isOpen;
    const hapus = () => {
        setOpen(!open);
        handleRemove(item.id, item.price);
    }
    return (
        <>
            <Dialog open={open} onOpenChange={() => setOpen(!open)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Hapus Item
                        </DialogTitle>
                        <DialogDescription>
                            Apakah anda yakin ingin menghapus item ini?
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end gap-x-4">
                        <Button onClick={() => setOpen(!open)}>Batal</Button>
                        <Button onClick={hapus} variant="destructive">Hapus</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

const DialogCheckout = ({ isOpen }) => {
    const { isCheckout, setIscheckout, setPembeli } = isOpen;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [telepon, setTelepon] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const pembeli = {
            nama: name,
            email: email,
            telepon: telepon,
            alamat: address
        }
        setPembeli(pembeli);
        setIscheckout(!isCheckout);
    }
    return (
        <>
            <Dialog open={isCheckout} onOpenChange={() => setIscheckout(!isCheckout)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Checkout
                        </DialogTitle>
                        <DialogDescription>
                            Silahkan isi data pemesan
                        </DialogDescription>
                    </DialogHeader>
                    <form action="" method="post" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-y-4">
                            <input type="text" name="name" id="name" placeholder="Nama" className="p-2 rounded-md border" value={name} onChange={(e) => setName(e.target.value)} />
                            <input type="email" name="email" id="email" placeholder="Email" className="p-2 rounded-md border" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <input type="tel" name="telepon" id="telepon" placeholder="Telepon/WA" className="p-2 rounded-md border" value={telepon} onChange={(e) => setTelepon(e.target.value)} />
                            <input type="text" name="address" id="address" placeholder="Alamat" className="p-2 rounded-md border" value={address} onChange={(e) => setAddress(e.target.value)} />
                        </div>
                        <DialogFooter className={"flex justify-end gap-x-4 mt-8"}>
                            <DialogClose asChild>
                                <Button variant="secondary">Batal</Button>
                            </DialogClose>
                            <Button type="submit">Checkout</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}

// const DialogDiscountItem = () => {

// }

export default Cart;