import { BagIcon , SaleIcon } from "@/components/icons";
import { Routes } from "@/shared/constants";
import { IIconProps } from "@/shared/types";
import {LayoutDashboard, LucideIcon, ScrollText, UserCircle} from 'lucide-react'

type TypeLink = {
    id: number 
    text:string 
    icon: ((props:IIconProps) => JSX.Element) | LucideIcon,
    href: string
}

export const sidebarLinks: TypeLink[] = [
    {
        id:1,
        text:'Overview',
        icon: LayoutDashboard,
        href: Routes.DASHBOARD
    },
    {
        id:2,
        text:'Products',
        icon:BagIcon,
        href:Routes.DASHBOARD_PRODUCTS,
    },
    {
        id:3,
        text:"Customers",
        icon: UserCircle,
        href: Routes.DASHBOARD_CUSTOMERS
    },
    {
        id:4,
        text: 'Categories',
        icon: ScrollText,
        href: Routes.DASHBOARD_CATEGORIES
    },
    {
        id:5,
        text: "Orders",
        icon: SaleIcon,
        href: Routes.DASHBOARD_ORDERS
    }
]