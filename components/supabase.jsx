import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,);

const getAllProducts = async () => {
    const { data:product, error } = await supabase.from('product').select(`*, category:category_id(name)`);
    if (error) throw error;
    return product;
}

const getPaginateProducts = async (page) => {
    const productsPerPage = 5;
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage - 1;
    const { count, error:countError } = await supabase.from('product').select('*', {count: 'exact', head: true});
    let { data:product, error } = await supabase.from('product').select(`*, category:category_id(name)`).range(startIndex, endIndex).order('created_at', { ascending: false });
    
    if (error || countError ) throw error || countError;
    
    const totalPages = Math.ceil(count / productsPerPage);

    return { product, count, startIndex, endIndex, totalPages };
}

const getTagProducts = async (tag) => {
    const { data:product, error } = await supabase
    .from('product').select(`*, category:category_id(name)`).eq('category_id', tag);
    if (error) throw error;
    return product;

}

const getAllTag = async (limit)=>{
    const { data: tag, error } = await supabase.from('category').select().order('created_at', { ascending: false });
    if (limit && tag.length > limit) {
        tag.splice(limit);
    }
    if (error) throw error;
    return tag;
}

const addProduct = async (product) => {
    const { data, error } = await supabase.from('product').insert(product).select();
    if (error) throw error;
    return data;
}

const deleteProduct = async (id) => {
    const { data, error } = await supabase.from('product').delete().match({id});
    if (error) throw error;
    return data;
}

const updateProduct = async (id, product) => {
    const { data, error } = await supabase.from('product').update(product).match({id});
    if (error) throw error;
    return data;
}

const countProduct = async () => {
    const { count, error } = await supabase.from('product').select('*', {count: 'exact', head: true});
    if (error) throw error
    return count
}

const chekoutProduct = async (product) => {
    const { error, status, statusText} = await supabase.from('checkout').insert(product)
    if (error) throw error
    return {status, statusText}
}

const countChekoutProduct = async () => {
    const {count, error} = await supabase.from('checkout').select('created_at, code', {count: 'exact', head: true})
    if (error) throw error
    return count
}

const uploadFile = async (file, name) =>{
    console.log(file, name)
    const {data, error} = await supabase.storage.from('pos_bucket').upload(`produk/${name}`, file)
    if (error) throw error
    return data
}

const productImage = async (name) =>{
    const {data: url} = await supabase.storage.from('pos_bucket').getPublicUrl(`produk/${name}`)
    return url.publicUrl
}

export { getAllProducts, getPaginateProducts, getTagProducts, getAllTag, addProduct, deleteProduct, updateProduct, countProduct, chekoutProduct, countChekoutProduct, uploadFile, productImage }