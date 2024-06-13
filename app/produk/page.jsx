'use client'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

import { TopNav } from "@/components/nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"
import { countProduct, getPaginateProducts } from "@/components/supabase"
import { ProductsRowTable } from "@/components/products components/products-row-table"
import { AddProductDialog } from "@/components/products components/products-dialog";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then(res => res.json())

const Page = () => {
    const searchParams = useSearchParams();
    const page = searchParams.get('page') || 1;
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(0);
    const [totalData, setTotalData] = useState(0);
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(0);

    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const products = await getPaginateProducts(page)

                setData(products.product)
                setTotalData(products.count)
                setStartIndex(products.startIndex + 1)
                setEndIndex(products.endIndex + 1)
                setTotalPages(products.totalPages)
            } catch (error) {
                setError(error)
            }
            setIsLoading(false)
        }
        fetchData()
    }, [page])

    //Use SWR
    // const select = encodeURIComponent('*,category:category_id(name)')
    // const order = encodeURIComponent('created_at.desc')
    // const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/product?select=${select}&apikey=${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}&offset=${startIndex}&limit=${endIndex}`, fetcher, {refreshInterval: 3000})
    // useEffect(()=>{
    //     const productsPerPage = 5
    //     const count = async ()=>{
    //         return await countProduct()
    //     }
    //     if(data){
    //         setStartIndex((page - 1) * productsPerPage)
    //         setEndIndex(startIndex + productsPerPage - 1)
    //         setTotalPages(Math.ceil(count / productsPerPage))
    //         setTotalData(count)
    //     }
    // },[data, page, startIndex])
    // console.log(data)

    return (
        <>
            <main className="col-span-11 py-6 pr-6">
                <TopNav />

                <Card>
                    <CardHeader className="flex flex-row justify-between">
                        <div>
                            <CardTitle>Produk</CardTitle>
                            <CardDescription>Daftar produk yang tersedia</CardDescription>
                        </div>
                        <div>
                            <Button size="sm" className="flex gap-x-2" onClick={() => setOpen(true)}>
                                <FontAwesomeIcon icon={faCirclePlus} size="lg" />
                                <span>Tambah Produk</span>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="hidden md:w-[100px] sm:table-cell">
                                        <span className="sr-only">Gambar</span>
                                    </TableHead>
                                    <TableHead>Nama Produk</TableHead>
                                    <TableHead className="hidden md:table-cell">Harga</TableHead>
                                    <TableHead className="hidden md:table-cell">Harga Satuan</TableHead>
                                    <TableHead className="hidden md:table-cell">Kategori</TableHead>
                                    <TableHead className="hidden md:table-cell">Dibuat pada</TableHead>
                                    <TableHead>
                                        <span className="sr-only">Aksi</span>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    error ? (<div>Terjadi kesalahan saat memuat data</div>)
                                        : isLoading ? (
                                            <TableRow>
                                                <TableCell colSpan={6}>Sedang memuat...</TableCell>
                                            </TableRow>
                                        )
                                            : (data.map((item) => {
                                                return (
                                                    <ProductsRowTable key={item.id} product={item} />
                                                )
                                            }
                                            )
                                            )
                                }
                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <div className="text-xs text-muted-foreground">
                            Menampilkan <strong>{startIndex} - {endIndex>totalData? totalData : endIndex}</strong> dari <strong>{totalData}</strong>
                            {" "}produk
                        </div>
                        <Pagination className="flex justify-end mx-0 w-fit  ">
                            <PaginationContent>
                                {page > 2 && (
                                    <PaginationItem className="sm:hidden lg:block">
                                        <PaginationLink href={`/produk?page=1`} className="w-fit p-2.5">Halaman Awal</PaginationLink>
                                    </PaginationItem>
                                )}
                                {page > 1 && (

                                    <PaginationItem>
                                        <PaginationPrevious href={`/produk?page=${Number(page) - 1}`} />
                                    </PaginationItem>
                                )}
                                {totalPages > 5 ? (
                                    Array.from({ length: totalPages }, (_, i) => {
                                        if ((i >= Number(page) - 2 && i <= Number(page)) || i >= totalPages - 2) {
                                            return (
                                                <PaginationItem key={i}>
                                                    <PaginationLink
                                                        href={`/produk?page=${i + 1}`}
                                                        isActive={Number(page) === i + 1}
                                                    >
                                                        {i + 1}
                                                    </PaginationLink>
                                                </PaginationItem>
                                            )
                                        } else if ((i === Number(page) + 1 && Number(page) >= 8) || i === totalPages - 3) {
                                            return (
                                                <PaginationItem key={i}>
                                                    <PaginationEllipsis />
                                                </PaginationItem>
                                            )
                                        } else {
                                            return null;
                                        }
                                    })
                                ) : (
                                    Array.from({ length: totalPages }, (_, i) => (
                                        <PaginationItem key={i}>
                                            <PaginationLink
                                                href={`/produk?page=${i + 1}`}
                                                isActive={Number(page) === i + 1}
                                            >
                                                {i + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))
                                )}
                                {page < totalPages && (
                                    <>
                                        <PaginationItem>
                                            <PaginationNext href={`/produk?page=${Number(page) + 1}`} />
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink href={`/produk?page=${Number(totalPages)}`} className="w-fit p-2.5 sm:hidden xl:block">Halaman Akhir</PaginationLink>
                                        </PaginationItem>
                                    </>
                                )}
                            </PaginationContent>
                        </Pagination>

                    </CardFooter>
                </Card>
                <AddProductDialog dialog={{ open, setOpen }} />
            </main>
        </>
    )
}

export default Page;