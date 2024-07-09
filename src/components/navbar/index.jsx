import React, { useEffect, useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  Bars3BottomLeftIcon,
  EnvelopeIcon,
  LockClosedIcon,
  ArrowLeftOnRectangleIcon,
  UserIcon,
  Cog8ToothIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../../utils/cookies";
import { onMessageListener, requestForToken } from "../../firebase/firebase";
import { logOut, saveFCM } from "../../api";
const profile = [
  { name: "Profile", href: "#", current: true, icon: <UserIcon /> },
  { name: "Inbox", href: "#", current: false, icon: <EnvelopeIcon /> },
  {
    name: "Account Settings",
    href: "#",
    current: false,
    icon: <Cog8ToothIcon />,
  },
  { name: "Lock", href: "#", current: false, icon: <LockClosedIcon /> },
  {
    name: "Logout",
    href: "#",
    current: false,
    icon: <ArrowLeftOnRectangleIcon />,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const [notification, setNotification] = useState([{ title: "", body: "" }]);

  useEffect(() => {
    const initializeFCM = async () => {
      const fcmToken = localStorage.getItem("fcmToken");
      if (!fcmToken) {
        try {
          const currentToken = await requestForToken();
          if (currentToken) {
            console.log("current token for client: ", currentToken);
            await saveFCM(currentToken);
            localStorage.setItem("fcmToken", currentToken);
          }
        } catch (error) {
          console.log("Error retrieving FCM token: ", error);
        }
      }
    };

    initializeFCM();
  }, []);

  onMessageListener((payload) => {
    setNotification([
      {
        title: payload?.notification?.title,
        body: payload?.notification?.body,
      },
    ]);
  });



  const handleMenuItemClick = (item) => {
    if (item.name === "Logout") {
      removeToken();
      logOut(localStorage.getItem("fcmToken")).then((e) => console.log("e", e));
      navigate("/login");
    }
  };

  console.log("notification", notification);

  return (
    <Disclosure as="nav" className="bg-white relative">
      {({ open }) => (
        <nav className="bg-white relative">
          <div className="px-4 py-1">
            <div className="relative flex h-16 items-center justify-between py-8">
              <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {isHovered ? (
                  <Bars3Icon
                    onClick={toggleSidebar}
                    className="block h-6 w-6 cursor-pointer text-[#007bff]"
                    aria-hidden="true"
                  />
                ) : (
                  <Bars3BottomLeftIcon
                    onClick={toggleSidebar}
                    className="block h-6 w-6 cursor-pointer text-[#007bff]"
                    aria-hidden="true"
                  />
                )}
              </div>

              <div className="md:hidden">
                <img
                  src="https://metropolitanhost.com/themes/themeforest/angular/mystic/assets/img/logo-sm-dark.png"
                  alt="logo"
                />
              </div>

              <div className="hidden md:block">
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <div className="flex items-center">
                    <button
                      type="button"
                      className="relative rounded-full p-1 text-gray-400 hover:text-cyan-950 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 mr-1"
                    >
                      <EnvelopeIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    <Menu as="div" className="relative ml-3">
                      <MenuButton className="relative rounded-full px-2 text-gray-400 hover:text-cyan-950 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                        <div className="absolute top-0 right-0 h-3 w-3 rounded-full bg-red-600 border-2 border-white"></div>
                      </MenuButton>

                      <MenuItems
                        transition
                        className="absolute right-0 z-10 mt-2 w-60 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none"
                      >
                        <h1 className="text-center font-medium">
                          Notifications
                        </h1>
                        {notification.map((item, index) => (
                          <MenuItem key={item.name}>
                            {({ active }) => (
                              <div
                                key={index}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm w-full text-gray-700"
                                )}
                              >
                                <p>
                                  <span className="font-semibold">
                                    {" "}
                                    Title:{" "}
                                  </span>{" "}
                                  {item.title}
                                </p>
                                <p>
                                  <span className="font-semibold">Body: </span>{" "}
                                  {item.body}
                                </p>
                              </div>
                            )}
                          </MenuItem>
                        ))}
                      </MenuItems>
                    </Menu>
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                        </MenuButton>
                      </div>
                      <MenuItems
                        transition
                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none"
                      >
                        {profile.map((item) => (
                          <MenuItem key={item.name}>
                            {({ active }) => (
                              <button
                                onClick={() => handleMenuItemClick(item)}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "flex px-4 py-2 text-sm w-full text-gray-700"
                                )}
                              >
                                <span className="block h-4 w-4 cursor-pointer">
                                  {item.icon}
                                </span>
                                <span className="ml-2">{item.name}</span>
                              </button>
                            )}
                          </MenuItem>
                        ))}
                      </MenuItems>
                    </Menu>
                  </div>
                </div>
              </div>

              <div className="md:hidden">
                <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon
                    className="block h-6 w-6 text-[#007bff]"
                    aria-hidden="true"
                  />
                </DisclosureButton>
              </div>
            </div>
          </div>

          <DisclosurePanel className="md:hidden">
            <div
              className={`space-y-1 px-2 pb-3 pt-2 bg-[#34334a] absolute w-full transition-all transform duration-700 ease-in-out ${
                open
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-full"
              }`}
            >
              <DisclosureButton
                as="div"
                className="flex justify-end rounded-md px-3 py-2 text-base font-medium"
              >
                <div className="inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    type="button"
                    className="rounded-full p-1 text-gray-400 hover:text-cyan-950 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 mr-1"
                  >
                    <EnvelopeIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                  <Menu as="div" className="relative ml-3">
                    <MenuButton className="relative rounded-full px-2 text-gray-400 hover:text-cyan-950 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                      <div className="absolute top-0 right-0 h-3 w-3 rounded-full bg-red-600 border-2 border-white"></div>
                    </MenuButton>

                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-60 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none"
                    >
                      <h1 className="text-center font-medium">Notifications</h1>
                      {notification.map((item, index) => (
                        <MenuItem key={item.name}>
                          {({ active }) => (
                            <div
                              key={index}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm w-full text-gray-700"
                              )}
                            >
                              <p>
                                <span className="font-semibold"> Title: </span>{" "}
                                {item.title}
                              </p>
                              <p>
                                <span className="font-semibold">Body: </span>{" "}
                                {item.body}
                              </p>
                            </div>
                          )}
                        </MenuItem>
                      ))}
                    </MenuItems>
                  </Menu>
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                      </MenuButton>
                    </div>
                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none"
                    >
                      {profile.map((item) => (
                        <MenuItem key={item.name}>
                          {({ active }) => (
                            <button
                              onClick={() => handleMenuItemClick(item)}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "flex px-4 py-2 text-sm w-full text-gray-700"
                              )}
                            >
                              <span className="block h-4 w-4 cursor-pointer">
                                {item.icon}
                              </span>
                              <span className="ml-2 text-sm">{item.name}</span>
                            </button>
                          )}
                        </MenuItem>
                      ))}
                    </MenuItems>
                  </Menu>
                </div>
              </DisclosureButton>
            </div>
          </DisclosurePanel>
        </nav>
      )}
    </Disclosure>
  );
};

export default Navbar;
