import React, { useEffect, useState } from "react";
import Header from "../navbar";
import { useMediaQuery } from "react-responsive";
import SideBarMenu from "../menu";
import Dashboard from "../dashboard";
import { Link, Outlet } from "react-router-dom";

const Sidebar = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const [isSidebarOpen, setSidebarOpen] = useState(isDesktop ? true : false);

  const toggleSidebar = () => {
    setSidebarOpen((pre) => !pre);
  };

  return (
    <>
      <div className="" data-dev-hint="container">
        {isSidebarOpen && (
          <>
            <div
              className="lg:hidden block absolute top-0 w-full bottom-0 left-0 bg-black opacity-30 z-10"
              onClick={() => setSidebarOpen(false)}
            ></div>
            <aside
              id="sidebar"
              className="fixed bg-[#3A3952] shadow-orange-52 lg:w-56 w-3/4 min-w-56 z-10 max-w-72 h-full transform transition duration-500 ease-in-out"
            >
              <Link to="/" className="shadow-md shadow-black-300 m-0 p-0">
                <div className="flex items-center justify-center cursor-pointer shadow-md bg-[#34334a] py-3">
                  <img
                    src="https://metropolitanhost.com/themes/themeforest/angular/mystic/assets/img/logo.png"
                    alt="logo"
                    height={36}
                    width={150}
                  />
                </div>
              </Link>
              <SideBarMenu />
            </aside>
          </>
        )}
      </div>

      <main
        id="content"
        className={` h-screen bg-gray-100 ${
          isSidebarOpen ? "lg:pl-[224px]" : "w-full"
        }`}
      >
        <div className="border rounded-md bg-white shadow-outline">
          <div>
            <Header toggleSidebar={toggleSidebar} />
          </div>
        </div>
        <div className="sm:mx-4 lg:mx-16">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default Sidebar;
