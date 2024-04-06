import { createClient } from "@/utils/supabase/server";

export async function Products() {
    const supabase = createClient();
    const {data: product} = await supabase.from('product').select();
    return product;
} 