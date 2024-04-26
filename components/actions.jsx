'use server'
import { addProduct } from "@/components/supabase"
import { revalidatePath } from "next/cache";

export default async function handleAddProduct(prevState, formData){
    let gambarName = formData.get('gambar').name === 'undefined' ? 'food.jpg' : formData.get('gambar').name;
    const rawFormData = {
        nama: formData.get('nama'),
        harga: formData.get('harga'),
        harga_satuan: formData.get('harga_satuan'),
        category_id: formData.get('category'),
        gambar: gambarName
    }
    try {
        await addProduct(rawFormData)
        revalidatePath('/produk')
        return {status: 'success', message: 'Produk berhasil ditambahkan'}
    } catch (error) {
        return {status: 'error', message: error}
    }
}
