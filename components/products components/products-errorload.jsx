const ErrorLoadProducts = (error) => {
    return(
        <>
            <div className="bg-white h-40 rounded-lg">
                <div className="flex flex-col items-center justify-center h-full">
                    <h1 className="text-2xl font-semibold">Error Loading Products</h1>
                    <p className="text-slate-400">Please check your internet connection and try again</p>
                    {error.message && <p className="text-slate-400">Error: {error.message}</p>}
                </div>
            </div>
        </>
    )
}

export default ErrorLoadProducts;