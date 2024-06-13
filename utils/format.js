import { countChekoutProduct } from "@/components/supabase";

const formattedPrice = (price) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(price)
}
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
    const formattedTime = date.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });
    return `${formattedDate.replace(/\//g, '-')} ${formattedTime}`;
}


const date = new Date()
const formattedDate = date.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

const formatDateTime = () => {
    const formattedTime = date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Makassar' }) 

    return `${formattedDate}, ${formattedTime} WITA`
}

const codeInvoice = async () => {
    const count = await countChekoutProduct()
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[date.getMonth()];
    const day = String(date.getDate()).padStart(2, '0');
    const orderNumber = String(count + 1).padStart(4, '0'); // replace 1 with your order number

    const formattedString = `${month}${day}${orderNumber}`;
    return formattedString;
}

export { formattedPrice, formatDate, formatDateTime, codeInvoice, formattedDate}