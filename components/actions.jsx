'use server'
import { addProduct } from "@/components/supabase"

export default async function handleAddProduct(formData){
    let gambarName = formData.get('gambar').name === 'undefined' ? 'food.jpg' : formData.get('gambar').name;
    const rawFormData = {
        nama: formData.get('nama'),
        harga: formData.get('harga'),
        harga_satuan: formData.get('harga_satuan'),
        category_id: formData.get('category'),
        gambar: gambarName
    }
    await addProduct(rawFormData)
    
}
