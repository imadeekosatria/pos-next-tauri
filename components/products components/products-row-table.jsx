'use client'
import { TableRow, TableCell } from "@/components/ui/table"
import Image from "next/image"
import { formattedPrice, formatDate } from "@/utils/format"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { faEllipsis } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { food } from "@/components/images"
import { EditProductDialog } from "./products-dialog"
import { useState } from "react"

const ProductsRowTable = ({ product }) => {
    const [isOpen, setIsOpen] = useState(false);

    // console.log(product)
    return (
        <>
            <TableRow>
                <TableCell className="hidden md:table-cell">
                    <Image src={food} alt="produk" width={64} height={64} priority/>
                </TableCell>
                <TableCell className="font-medium">{product.nama}</TableCell>
                <TableCell className="hidden md:table-cell">{formattedPrice(product.harga)}</TableCell>
                <TableCell className="hidden md:table-cell">{formattedPrice(product.harga_satuan)}</TableCell>
                <TableCell className="hidden md:table-cell">{product.category.name}</TableCell>
                <TableCell className="hidden md:table-cell">{formatDate(product.created_at)}</TableCell>
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
                            <DropdownMenuItem>
                                <span onClick={()=>setIsOpen(true)}>Edit</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>Hapus</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            </TableRow>
            <EditProductDialog item={product} dialog={{isOpen, setIsOpen}}/>
        </>
    )
}



export { ProductsRowTable }