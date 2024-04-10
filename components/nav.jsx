'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleUser, faHouse, faTicket, faBoxArchive, faMoon } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ShoppingCart } from "@/components/images"

const SideNav = () => {
  const pathname = usePathname();
  const link = [
    {
      name: "Beranda",
      path: "/",
      icon: faHouse
    },
    {
      name: "Discount",
      path: "/discount",
      icon: faTicket
    },
    {
      name: "Produk",
      path: "/produk",
      icon: faBoxArchive
    }
  ]
  return (
    <>
      <nav className="w-20 bg-white col-start-1 h-screen">
        <div className="px-4 py-8">
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger aria-label="User">
                <FontAwesomeIcon icon={faCircleUser} size="3x" style={{ color: '#64748b' }} />
              </TooltipTrigger>
              <TooltipContent side={"right"}>
                User
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

        </div>
        <div className="py-16 h-2/3 flex flex-col justify-center">
          <div className="flex flex-col items-center gap-y-6">
            {link.map((item, index) => (
              <TooltipProvider key={index} delayDuration={200}>
                <Tooltip>
                  <TooltipTrigger aria-label={item.name}>
                    <div key={index} className={`${pathname === item.path ? 'bg-blue-400 p-2' : 'hover:bg-slate-300 p-2'} rounded-2xl`}>
                      <Link href={item.path} aria-label={item.name}>
                        <FontAwesomeIcon icon={item.icon} fixedWidth={true} size="2x" className={`${pathname === item.path ? "text-slate-50" : "text-slate-500"}`} />
                      </Link>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side={"right"}>
                    {item.name}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>
      </nav>
    </>
  )
}

const TopNav = ({cartItems, setShowCart}) => {
  return (
    <>
      <div className="flex justify-between gap-x-4 items-center">
        <input type="text" placeholder="Cari produk" name="searchProduk" className="bg-white w-96 px-4 py-2 rounded-full focus:outline-slate-400 placeholder:text-slate-400" />
        <div className="flex items-center gap-x-8">
          <FontAwesomeIcon icon={faMoon} fixedWidth className="cursor-pointer bg-slate-50 p-2 rounded-full" />
          <button className="relative" onClick={() => { setShowCart(true) }} aria-label="cart">
            <ShoppingCart />
            {cartItems.length > 0 && <span className="absolute -top-2 -right-2 py-0.5 px-2 text-white font-medium rounded-full bg-red-500 text-xs">{cartItems.length}</span>}
          </button>
          <span className="font-semibold text-xl">Hello, Admin</span>
        </div>
      </div>
    </>
  )
}

export { SideNav, TopNav };