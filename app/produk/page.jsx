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
import { getPaginateProducts } from "@/components/supabase"
import { ProductsRowTable } from "@/components/products components/products-row-table"


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
                            <Button size="sm" className="flex gap-x-2">
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
                                                    <ProductsRowTable key={item.id} product={item}/>
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
                            Showing <strong>{startIndex}-{endIndex}</strong> of <strong>{totalData}</strong>
                            {" "}products
                        </div>
                        <Pagination className="flex justify-end mx-0 w-fit max-w-sm">
                            <PaginationContent>
                                {page > 1 && (
                                    <PaginationItem>
                                        <PaginationPrevious href={`/produk?page=${Number(page) - 1}`} />
                                    </PaginationItem>
                                )}
                                {Array.from({ length: totalPages }, (_, i) => {
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
                                })}
                                {totalPages > 5 && (
                                    <PaginationItem>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                )}
                                {page < totalPages && (
                                    <PaginationItem>
                                        <PaginationNext href={`/produk?page=${Number(page) + 1}`} />
                                    </PaginationItem>
                                )}
                            </PaginationContent>
                        </Pagination>

                    </CardFooter>
                </Card>
            </main>
        </>
    )
}

export default Page;