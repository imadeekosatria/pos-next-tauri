'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleUser, faHouse, faTicket, faBoxArchive, faArrowsRotate, faAddressCard } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ShoppingCart } from "@/components/images"

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
  },
  {
    name: "Member",
    path: "/member",
    icon: faAddressCard
  }
]
const SideNav = () => {
  const pathname = usePathname();
  return (
    <>
      <div className="relative z-10">
        <nav className="bg-white w-14 lg:w-16 col-start-1 h-screen fixed">
          <div className="w-full flex justify-center py-8">
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger aria-label="User">
                  <FontAwesomeIcon icon={faCircleUser} style={{ color: '#64748b' }} size="2x" />
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
                      <div key={index} className={`${pathname === item.path ? 'bg-blue-300 px-0.5 py-1 lg:p-2' : 'hover:bg-slate-300 px-0.5 py-1 lg:p-2'} rounded-lg`}>
                        <Link href={item.path} aria-label={item.name}>
                          <FontAwesomeIcon icon={item.icon} fixedWidth={true} size="xl" className={`${pathname === item.path ? "text-white" : "text-slate-500"}`} />
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
      </div>
    </>
  )
}

const TopNav = ({ cartItems, setShowCart }) => {
  const pathname = usePathname();
  return (
    <>
      <div className="relative">
        <div className="flex justify-between gap-x-4 items-center">
          <input type="text" placeholder="Cari produk" name="searchProduk" className="bg-white w-96 px-4 py-2 rounded-full focus:outline-slate-400 placeholder:text-slate-400" />
          <div className="flex items-center gap-x-4 lg:gap-x-8">
            <button onClick={() => window.location.reload()}><FontAwesomeIcon icon={faArrowsRotate} /></button>
            {(pathname === "/") && (
              <button className="relative" onClick={() => { setShowCart(true) }} aria-label="cart">
                <ShoppingCart />
                {cartItems.length > 0 && <span className="absolute -top-2 -right-2 py-0.5 px-2 text-white font-medium rounded-full bg-red-500 text-xs">{cartItems.length}</span>}
              </button>)
            }
            <span className="font-semibold text-base text-nowrap lg:text-xl">Hello, Admin</span>
          </div>
        </div>
        {(pathname !== "/") && (
          <BreadcrumbNav />
        )}
      </div>
    </>
  )
}

const BreadcrumbNav = () => {
  const pathname = usePathname();
  const linkName = link.find(item => item.path === pathname)?.name;
  return (
    <Breadcrumb className="hidden md:flex px-0.5 py-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Beranda</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{linkName}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export { SideNav, TopNav, BreadcrumbNav };