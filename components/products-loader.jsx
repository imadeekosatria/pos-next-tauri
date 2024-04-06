import { cn } from "@/lib/utils";
const ProductsLoader = () => {
    return (
        <>
            <div className="bg-slate-100 shadow-lg w-full h-max rounded-xl p-4 relative animate-pulse">
                <div className="rounded-lg shadow-lg w-full h-32 bg-slate-300"></div>
                <div className="bg-slate-300 p-4 rounded-full absolute top-2 right-2"></div>
                <div className="mt-4 flex flex-col gap-y-2">
                    <div className="flex justify-between font-medium">
                        <div className="w-40 rounded-full 2xl:max-w-28 p-2 bg-slate-300"></div>
                        <div className="w-20 p-2 bg-slate-300 rounded-full"></div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="w-20 bg-slate-300 p-2 rounded-full"></div>
                        
                    </div>
                    <div className="flex gap-x-4">
                        <button className="flex flex-col gap-y-1 items-center text-sm" >
                            <div className={cn("p-4 rounded-full", 'bg-slate-300' )}>
                                
                            </div>
                        </button>
                        <button className="flex flex-col gap-y-1 items-center text-sm" >
                            <div className={cn("p-4 rounded-full", 'bg-slate-300')}>
                                
                            </div>
                            
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductsLoader;