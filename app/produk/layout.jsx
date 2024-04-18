'use client'
import { Suspense } from "react";
const ProdukLayout = ({ children }) => {
    return (
        <>
        <Suspense fallback={<div>Loading...</div>}>
            {children}
        </Suspense>    
        </>
    )
}

export default ProdukLayout;