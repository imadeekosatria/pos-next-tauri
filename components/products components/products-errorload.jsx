import { Button } from "../ui/button";

const ErrorLoadProducts = (error) => {
    return(
        <>
            <div className="bg-white h-fit rounded-lg">
                <div className="flex flex-col items-center justify-center h-full py-8">
                    <h1 className="text-2xl font-semibold">Error Loading Products</h1>
                    <p className="text-slate-400">Please check your internet connection and try again</p>
                    {error.message && <p className="text-slate-400">Error: {error.message}</p>}
                    <div className="mt-4">
                        <Button onClick={() => window.location.reload()}>Refresh</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

const NoData = ()=>{
    return(
        <div className="bg-white h-fit rounded-lg">
            <div className="flex flex-col items-center justify-center h-full py-8">
                <h1 className="text-2xl font-semibold">No Products Available</h1>
                <p className="text-slate-400">Please check back later</p>
            </div>
        </div>
    )
}

export {NoData}

export default ErrorLoadProducts;