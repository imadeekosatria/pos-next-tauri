'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faHouse, faTicket, faBoxArchive } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const Nav = () => {
  const pathname = usePathname();
  const link = [
    {
      name: "Beranda",
      path: "/beranda",
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
              <TooltipTrigger>
                <FontAwesomeIcon icon={faCircleUser} size="3x" style={{ color: '#64748b' }} />
              </TooltipTrigger>
              <TooltipContent side={"right"}>
                User
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

        </div>
        <div className="py-16 h-2/3 flex flex-col justify-center">
          <ul className="flex flex-col items-center gap-y-6">
            {link.map((item, index) => (
              <TooltipProvider key={index} delayDuration={200}>
                <Tooltip>
                  <TooltipTrigger>
                    <li key={index} className={`${pathname === item.path ? 'bg-blue-400 p-2' : 'hover:bg-slate-300 p-2'} rounded-2xl`}>
                      <Link href={item.path}>
                        <FontAwesomeIcon icon={item.icon} fixedWidth={true} size="2x" className={`${pathname === item.path ? "text-slate-50" : "text-slate-500"}`} />
                      </Link>
                    </li>
                  </TooltipTrigger>
                  <TooltipContent side={"right"}>
                    {item.name}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </ul>
        </div>
      </nav>
    </>
  )
}

export { Nav };