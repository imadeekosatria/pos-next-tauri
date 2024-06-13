import { Roboto } from "next/font/google";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const roboto = Roboto({
    weight: ['100', '300', '400', '500', '700', '900'],
    subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext", "vietnamese"],
    display: 'swap'
});
const Page = () => {
    return (
        <>
            <main className={cn("h-screen bg-white w-full p-4 text-sky-950", `${roboto.className}`)}>
                <header className="flex justify-between items-center w-full">
                    <div className="flex flex-col w-fit">
                        <h1 className="font-bold text-2xl">UD. SARIEKOTIN</h1>
                        <span className="font-semibold text-xl">Faktur Pembayaran</span>
                    </div>
                    <div className="flex flex-col text-xl">
                        <span>Faktur ID: <span className="font-semibold">Jun11240001</span></span>
                        <span>Tanggal: <span className="font-semibold">11 Juni 2024, 15:45 WITA</span></span>
                    </div>
                </header>
                <div className="w-full grid grid-cols-3 bg-slate-200 p-6 rounded-2xl mt-8 gap-x-4 text-xl">
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col w-full">
                            <span className="text-slate-500">Faktur ke</span>
                            <span className="font-semibold text-lg">Natali Craig</span>
                        </div>
                        <Separator orientation="vertical" className="w-1 bg-slate-500 rounded-full" />
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col w-full">
                            <span className="text-slate-500">Metode Pembayaran</span>
                            <span className="font-medium">Cash</span>
                        </div>
                        <Separator orientation="vertical" className="w-1 bg-slate-500 rounded-full" />
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col w-full">
                            <span className="text-slate-500">Total tagihan</span>
                            <span className="font-medium">Rp 678.000</span>
                        </div>
                    </div>
                </div>
                <div className="mt-8">
                    <Table>
                        <TableCaption>
                        <div className="grid grid-cols-2 grid-rows-2 p-4 text-xl font-medium">
                            <span className="text-left">Subtotal</span>
                            <span className="text-right">Rp 250.00</span>
                            <span className="text-left">Diskon</span>
                            <span className="text-right text-red-500">-Rp 0</span>
                        </div>
                        <Separator className="w-full bg-slate-700 h-1 rounded-full text-xl px-4" />
                        <div className="grid grid-cols-2 p-4 text-xl text-sky-950">
                            <span className="text-left font-semibold">Total</span>
                            <span className="text-right font-semibold">$432.00</span>
                        </div>
                        </TableCaption>
                        <TableHeader>
                            <TableRow className="text-xl">
                                <TableHead className="w-48">Produk</TableHead>
                                <TableHead>Deskripsi</TableHead>
                                <TableHead>Qty</TableHead>
                                <TableHead className="text-right">Harga</TableHead>
                                <TableHead className="text-right">Total</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow className="text-lg">
                                <TableCell className="font-medium">INV001</TableCell>
                                <TableCell>Box</TableCell>
                                <TableCell>1</TableCell>
                                <TableCell className="text-right">$250.00</TableCell>
                                <TableCell className="text-right">$250.00</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
                <div className="absolute bottom-0">
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                            <span className="font-medium text-xl">UD. SARIEKOTIN</span>
                            <span>Jl. Raya Kertajaya No. 1, Surabaya</span>
                            <span>Telepon/WA: 123-456-7890</span>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Page;