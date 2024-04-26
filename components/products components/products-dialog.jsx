'use client'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
  
import { getAllTag } from "../supabase"
import { useEffect, useState } from "react"
import handleAddProduct from "@/components/actions"

const EditProductDialog = ({dialog, item}) => {
    // console.log(item)
    const {isOpen, setIsOpen} = dialog
    return(
        <>
            <Dialog open={isOpen} onOpenChange={()=> setIsOpen(!isOpen)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Product</DialogTitle>
                        <div>
                            <p>Isi</p>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    )
}

const AddProductDialog = ({dialog})=>{
    const [category, setCategory] = useState(null)
    useEffect(()=>{
        const fetchData = async () => {
            try {
                const kategori = await getAllTag()
                setCategory(kategori)
            } catch (error) {
                console.error(error)
            }            
        }
        fetchData()
    },[])
    const {open, setOpen} = dialog
    
    

    return(
        <>
            <Dialog open={open} onOpenChange={()=> setOpen(!open)}>
                <DialogContent className="sm:max-w-[512px]">
                    <DialogHeader>
                        <DialogTitle>Tambah Produk</DialogTitle>
                    </DialogHeader>
                    <form action={handleAddProduct}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="nama" className="text-right">Nama</Label>
                                <Input type="text" id="nama" name="nama" placeholder="Nama Produk" className="col-span-3" required></Input>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="harga" className="text-right">Harga</Label>
                                <Input type="number" id="harga" name="harga" placeholder="Harga Produk" className="col-span-3" required></Input>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="harga_satuan" className="text-right">Harga Satuan</Label>
                                <Input type="number" id="harga_satuan" name="harga_satuan" placeholder="Harga Satuan" className="col-span-3" required></Input>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="category" className="text-right">Kategori</Label>
                                <Select name="category" required>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Pilih Kategori"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                        category!= null && category.map((item)=>{
                                                return (
                                                    <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
                                                )
                                            })
                                        }
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="gambar" className="text-right">Gambar</Label>
                                <Input type="file" id="gambar" name="gambar" className="col-span-3" accept="image/jpeg,image/png"></Input>  
                            </div>
                        </div>
                        <DialogFooter>
                            <Button size="sm" type="submit">Tambah</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}

const RemovePoductDialog = ({dialog, item})=>{
    const {isOpen, setIsOpen} = dialog
    const {id, nama} = item
}
export { EditProductDialog, AddProductDialog }