import Link from "next/link";
import {
  Menubar,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger,
} from "./ui/menubar";
import { GitBranch, Home, Linkedin } from "lucide-react";

export function Header() {
  const menuItems = [
    {
      name: "home",
      icon: <Home className="w-4 h-4" />, // Reduzindo o tamanho do ícone
      url: "/",
    },
    {
      name: "Github",
      icon: <GitBranch className="w-4 h-4" />,
      url: "https://www.github.com/jeanpj12",
    },
    {
      name: "Linkedin",
      icon: <Linkedin className="w-4 h-4" />,
      url: "https://www.linkedin.com/in/jeanjr/",
    },
  ];

  return (
    <header className="fixed bottom-4 w-full flex justify-center mx-auto z-2">
      <Menubar className="shadow-md">
        {menuItems.map((item, index) => {
          return (
            <MenubarMenu key={index} >
              <MenubarTrigger className="hover:scale-[1.1] transition-all durantion-200">
                <Link href={item.url} className="flex gap-2 items-center">
                  <MenubarShortcut>{item.icon}</MenubarShortcut>
                  <span className="hidden md:inline" >{item.name}</span>
                </Link>
              </MenubarTrigger>
            </MenubarMenu>
          );
        })}
      </Menubar>
    </header>
  );
}
