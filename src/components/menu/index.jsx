import React, { useState } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/outline";

const SideBarMenu = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const menus = [
    {
      title: "Dashboard",
      icon: ComputerDesktopIcon,
      submenuItems: [
        { title: "Crypto Currency" },
        { title: "Web Analytics" },
        { title: "Social Media" },
        { title: "Project Management" },
        { title: "Client Management" },
      ],
    },
  ];

  const toggleMenu = (index) => {
    setOpenMenu(openMenu === index ? null : index);
  };

  return (
    <ul className="text-white h-screen">
      {menus.map((menu, index) => (
        <li key={index}>
          <div
            className="flex justify-between items-center cursor-pointer py-3 pl-5 pr-3"
            onClick={() => toggleMenu(index)}
          >
            <div className="flex items-center">
              <menu.icon className="h-5 w-5 mr-3" />
              <span>{menu.title}</span>
            </div>
            {openMenu === index ? (
              <ChevronUpIcon className="ml-2 h-3 w-3" />
            ) : (
              <ChevronDownIcon className="ml-2 h-3 w-3" />
            )}
          </div>
          <div
            className={`transition-[max-height] duration-1000 ease-in-out overflow-hidden ${
              openMenu === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <ul className="bg-[#34334A] pl-12">
              {menu.submenuItems.map((submenu, subIndex) => (
                <li key={subIndex} className="p-2 cursor-pointer text-sm">
                  {submenu.title}
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SideBarMenu;
