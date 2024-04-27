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
import { useEffect, useState } from "react"
import { useFormState } from 'react-dom'
import { useToast } from "@/components/ui/use-toast"
import { addProduct, deleteProduct, updateProduct, getAllTag } from "@/components/supabase"


const initialState = {
    message: '',
  }
const EditProductDialog = ({dialog, item}) => {
    // console.log(item)
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
    const {isEdit, setIsEdit} = dialog
    const { toast } = useToast()
    
    
    const formSubmit = async (prevState, formData) => {
        let gambarFile = formData.get('gambar');
        let gambarName = gambarFile && gambarFile.name ? gambarFile.name : 'food.jpg';

        const rawFormData = {
            nama: formData.get('nama'),
            harga: formData.get('harga'),
            harga_satuan: formData.get('harga_satuan'),
            category_id: formData.get('category'),
            gambar: gambarName
        }
        try {
            await updateProduct(item.id, rawFormData)
            return {status: 'success', message: 'Produk berhasil diedit'}
        } catch (error) {
            return {status: 'error', message: error}
        }
    }
    const [state, formAction] = useFormState(formSubmit, initialState)

    useEffect(() => {
    const handleToast = async () => {
        if (state.status === 'success') {
            setIsEdit(prevIsEdit => prevIsEdit ? false : prevIsEdit);
            toast({ title: 'Berhasil!', description: JSON.stringify(state.message) });
        } else if (state.status === 'error') {
            toast({ title: 'Gagal!', description: JSON.stringify(state.message.message).replace(/\\/g, '').replace(/"/g, '') });
        }
    }
    handleToast();
}, [state, toast, setIsEdit]);

    return(
        <>
            <Dialog open={isEdit} onOpenChange={()=> setIsEdit(!isEdit)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Product</DialogTitle>
                    </DialogHeader>
                    <form action={formAction}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="nama" className="text-right">Nama</Label>
                                <Input type="text" id="nama" name="nama" placeholder="Nama Produk" className="col-span-3" required defaultValue={item.nama}></Input>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="harga" className="text-right">Harga</Label>
                                <Input type="number" id="harga" name="harga" placeholder="Harga Produk" className="col-span-3" required defaultValue={item.harga}></Input>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="harga_satuan" className="text-right">Harga Satuan</Label>
                                <Input type="number" id="harga_satuan" name="harga_satuan" placeholder="Harga Satuan" className="col-span-3" required defaultValue={item.harga_satuan}></Input>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="category" className="text-right">Kategori</Label>
                                <Select name="category" required defaultValue={item.category_id}>
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
                            <Button size="sm" type="submit">Edit</Button>
                        </DialogFooter>
                    </form>
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
    
    const { toast } = useToast()
    
    
    const formSubmit = async (prevState, formData) => {
        let gambarFile = formData.get('gambar');
        let gambarName = gambarFile && gambarFile.name ? gambarFile.name : 'food.jpg';

        const rawFormData = {
            nama: formData.get('nama'),
            harga: formData.get('harga'),
            harga_satuan: formData.get('harga_satuan'),
            category_id: formData.get('category'),
            gambar: gambarName
        }
        try {
            await addProduct(rawFormData)
            return {status: 'success', message: 'Produk berhasil ditambahkan'}
        } catch (error) {
            return {status: 'error', message: error}
        }
    }
    const [state, formAction] = useFormState(formSubmit, initialState)

    useEffect(() => {
    const handleToast = async () => {
        if (state.status === 'success') {
            setOpen(prevOpen => prevOpen ? false : prevOpen);
            toast({ title: 'Berhasil!', description: JSON.stringify(state.message) });
        } else if (state.status === 'error') {
            toast({ title: 'Gagal!', description: JSON.stringify(state.message.message).replace(/\\/g, '').replace(/"/g, '') });
        }
    }
    handleToast();
}, [state, toast, setOpen]);

    return(
        <>
            <Dialog open={open} onOpenChange={()=> setOpen(!open)}>
                <DialogContent className="sm:max-w-[512px]">
                    <DialogHeader>
                        <DialogTitle>Tambah Produk</DialogTitle>
                    </DialogHeader>
                    <form action={formAction}>
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

const RemoveProductDialog = ({dialog, item})=>{
    const {isHapus, setIsHapus} = dialog
    const {id, nama} = item
    
    const { toast } = useToast()

    const handleDelete = async()=>{
        try {
            await deleteProduct(id)
            setIsHapus(!isHapus)
            toast({title: 'Berhasil!', description: 'Produk berhasil dihapus'})
        } catch (error) {
            toast({title: 'Gagal!', description: JSON.stringify(error.message).replace(/\\/g,'').replace(/"/g,'')})
        }
    }

    return (
        <>
            <Dialog open={isHapus} onOpenChange={()=>setIsHapus(!isHapus)}>
                <DialogContent className="sm:max-w-[512px]">
                    <DialogHeader>
                        <DialogTitle>Hapus Produk</DialogTitle>
                        <DialogDescription>Apakah anda yakin ingin menghapus produk <strong>{nama}</strong>?</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button size="sm" variant="outline" onClick={()=>setIsHapus(!isHapus)}>Batal</Button>
                        <Button size="sm" variant="destructive" onClick={handleDelete}>Hapus</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

export { EditProductDialog, AddProductDialog, RemoveProductDialog }