import { NavLink, Outlet } from 'react-router'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
  } from "@/components/ui/navigation-menu"
  

const NavLayout = () => {
    return (
        <>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-lg p-4 fixed top-0 w-full z-50">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-green-700">LaborFinder</h1>
                    <nav className="hidden md:flex space-x-6">
                        <NavLink to="/" className="text-green-700 hover:text-gray-200">Home</NavLink>
                        {/* <DropdownMenu>
                            <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                <DropdownMenuItem>Billing</DropdownMenuItem>
                                <DropdownMenuItem>Team</DropdownMenuItem>
                                <DropdownMenuItem>Subscription</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu> */}

                        <NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink>Link</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>


                        {/* <NavLink className="text-green-700 hover:text-gray-200">Services</NavLink> */}
                        <NavLink className="text-green-700 hover:text-gray-200">About</NavLink>
                        <NavLink to="/login" className="text-green-700 hover:text-gray-200">Login/Signup</NavLink>
                    </nav>
                </div>
            </div>
            <Outlet />
        </>

    )
}

export default NavLayout
