import { LucideIcon, Settings, UserCircle } from "lucide-react";
import { Routes } from "@/shared/constants";


type TypeLink = {
    id: number 
    text:string 
    icon: LucideIcon,
    href: string
}

export const menuLinks: TypeLink[] = [
    {
        text:'Profile',
        icon: UserCircle,
        href: Routes.PROFILE_ME,
        id:1
    },
    {
        text: "Settings",
        href: Routes.SETTINGS,
        icon:Settings,
        id:2
    }
]