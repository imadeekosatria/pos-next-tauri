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
import { EditProductDialog, RemoveProductDialog } from "./products-dialog"
import { useEffect, useState } from "react"
import { productImage } from "../supabase"

const ProductsRowTable = ({ product }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [isHapus, setIsHapus] = useState(false);
    const [image, setImage] = useState(food)
    useEffect(() => {
        productImage(product.gambar).then((data) => {
            setImage(data)
        }).catch((error) => {
            console.log(error)
        })
    }, [product.gambar])
    return (
        <>
            <TableRow>
                <TableCell className="hidden md:table-cell">
                    <Image src={image} alt="produk" width={64} height={64} priority/>
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
                            <DropdownMenuItem onClick={()=>setIsEdit(true)}>
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={()=>setIsHapus(true)}>
                                Hapus
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            </TableRow>
            <EditProductDialog item={product} dialog={{isEdit, setIsEdit}}/>
            <RemoveProductDialog item={{id:product.id, nama: product.nama}} dialog={{isHapus, setIsHapus}}/>
        </>
    )
}



export { ProductsRowTable }