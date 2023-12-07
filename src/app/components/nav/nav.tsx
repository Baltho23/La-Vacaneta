'use client'
import "./nav.css";
import React, { useState } from "react";
import { 
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  Link, 
  Button, 
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  DropdownTrigger,
  Dropdown,
  DropdownItem,
  DropdownMenu
} from "@nextui-org/react";
import Image from 'next/image'
import { useAuth } from "@/app/services/auth.provider";
import { useRouter } from "next/navigation";



export default function Nav() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user: currentUser, login, logout } = useAuth();
  const router= useRouter()

  const menuItems = [
    "Inicio",
    "Nosotros",
    "Contactanos",
    "Mi cuenta"
  ];

  function abrirDashboard(){
    router.push("/dashboard")
  }

  const ProfileItem = () => {
    if (currentUser) {
      return (
        <NavbarItem className="flex cursor-pointer">
          <Dropdown>
            <DropdownTrigger>
              <div className="flex">
                <Image
                  src={ currentUser.avatar }
                  alt="profile-picture"
                  height={40}
                  width={50}
                  className="rounded"
                ></Image>

                <div className="gris ml-2">
                  <h3 className="font-medium">{ currentUser.name }</h3>
                  <p className="text-sm">{ currentUser.role }</p>
                </div>
              </div>
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="dashboard" onPress={abrirDashboard}>
                Modulos
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onPress={logout}>
                Cerrar sesion
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      );
    } else {
      return (
        <NavbarItem>
          <Button 
            as={Link} 
            color="secondary" 
            href="login" 
            variant="flat"
          >
            Ingresar
          </Button>
        </NavbarItem>
      );
    }
  }

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link className="text-xl flex gap-2" href="/" color="foreground">
            Le Vache<span className="text-inherit font-bold">Patineuse</span>
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-5" justify="end">
        <NavbarItem>
          <Link color="foreground" href="/" aria-current="page">
            Inicio
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#about-us" color="foreground">
            Nosotros
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#footer">
            Contactanos
          </Link>
        </NavbarItem>
        <ProfileItem/>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color="foreground"
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}