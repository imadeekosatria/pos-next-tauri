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
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import { food } from "@/components/images";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"

const fetcher = url => fetch(url).then(res => res.json())
const formattedPrice = (price) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(price)
}
function formatDate(dateString) {
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
const Page = () => {
    const searchParams = useSearchParams();
    const page = searchParams.get('page') || 1;
    const { data, error, isLoading } = useSWR(`/api/produk?page=${page}`, fetcher);
    const start = (data?.body.page - 1) * data?.body.itemPerPage + 1;
    const end = start + data?.body.data.length - 1;
    const currentPage = data?.body.page;
    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };
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
                                            : (data.body.data.map((item) => {
                                                return (
                                                    <TableRow key={item.id}>
                                                        <TableCell className="hidden md:table-cell">
                                                            <Image src={food} alt="produk" width={64} height={64} />
                                                        </TableCell>
                                                        <TableCell className="font-medium">{item.nama}</TableCell>
                                                        <TableCell className="hidden md:table-cell">{formattedPrice(item.harga)}</TableCell>
                                                        <TableCell className="hidden md:table-cell">{formattedPrice(item.harga_satuan)}</TableCell>
                                                        <TableCell className="hidden md:table-cell">{item.category.name}</TableCell>
                                                        <TableCell className="hidden md:table-cell">{formatDate(item.created_at)}</TableCell>
                                                        <TableCell>
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger asChild>
                                                                    <Button size="icon" variant="ghost">
                                                                        <FontAwesomeIcon icon={faEllipsis} />
                                                                        <span className="sr-only">Toggle Menu</span>
                                                                    </Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent>
                                                                    <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                                                                    <DropdownMenuSeparator />
                                                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                                                    <DropdownMenuItem>Hapus</DropdownMenuItem>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            }))
                                }
                            </TableBody>
                        </Table>

                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <div className="text-xs text-muted-foreground">
                            Showing <strong>{start}-{end}</strong> of <strong>{data?.body.totalData}</strong>{" "}
                            products
                        </div>
                        <Pagination className="flex justify-end mx-0 w-fit max-w-sm">
                            <PaginationContent>
                                {currentPage > 1 && (
                                    <PaginationItem>
                                        <PaginationPrevious href={`/produk?page=${Number(currentPage) - 1}`} />
                                    </PaginationItem>
                                )}
                                {Array.from({ length: data?.body.totalPages }, (_, i) => {
                                    return (
                                        <PaginationItem key={i}>
                                            <PaginationLink
                                                href={`/produk?page=${i + 1}`}
                                                isActive={Number(currentPage) === i + 1}
                                            >
                                                {i + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    )
                                })}
                                {/* {data?.body.totalPages > 5 && (
                                    <PaginationItem>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                )} */}
                                {currentPage < data?.body.totalPages && (
                                    <PaginationItem>
                                        <PaginationNext href={`/produk?page=${Number(currentPage) + 1}`} />
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