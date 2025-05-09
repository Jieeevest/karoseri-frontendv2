"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Grid } from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: string;
  separator: string;
  subItems?: SubNavItem[];
}

interface SubNavItem {
  href: string;
  label: string;
  icon: string;
  subItems?: SubNavItem[];
}

const navItems: NavItem[] = [
  {
    href: "/workspace/dashboard",
    label: "Dashboard",
    icon: "ki-element-11", // Replace with actual dashboard icon
    separator: "",
  },
  {
    href: "/workspace/requests",
    label: "Permintaan",
    icon: "ki-package",
    separator: "transactional",
  },
  {
    href: "/workspace/inbounds",
    label: "Barang Masuk",
    icon: "ki-purchase",
    separator: "transactional",
  },
  {
    href: "/workspace/outbounds",
    label: "Barang Keluar",
    icon: "ki-purchase",
    separator: "transactional",
  },
  {
    href: "/workspace/inventories",
    label: "Inventaris",
    icon: "ki-office-bag",
    separator: "transactional",
  },
  {
    href: "/workspace/employees",
    label: "Karyawan",
    icon: "ki-users",
    separator: "master data",
  },
  {
    href: "/workspace/roles",
    label: "Akses Role",
    icon: "ki-security-user",
    separator: "master data",
  },
  {
    href: "/workspace/groups",
    label: "Grup",
    icon: "ki-users",
    separator: "master data",
  },
  {
    href: "/workspace/positions",
    label: "Jabatan",
    icon: "ki-briefcase",
    separator: "master data",
  },

  {
    href: "/workspace/suppliers",
    label: "Suplier",
    icon: "ki-users",
    separator: "master data",
  },
  {
    href: "/workspace/vehicles",
    label: "Kendaraan",
    icon: "ki-delivery",
    separator: "master data",
  },
  {
    href: "/workspace/locations",
    label: "Lokasi Penyimpanan",
    icon: "ki-geolocation",
    separator: "master data",
  },
];

export default function Sidebar() {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);

  const handleToggleMenu = (index: number) => {
    if (openMenuIndex === index) {
      setOpenMenuIndex(null);
    } else {
      setOpenMenuIndex(index);
    }
  };

  const groupedNavItems = navItems.reduce<Record<string, NavItem[]>>(
    (groups, item) => {
      if (!groups[item.separator]) {
        groups[item.separator] = [];
      }
      groups[item.separator].push(item);
      return groups;
    },
    {}
  );

  return (
    <div className="absolute">
      <div
        className={`lg:w-64 w-full h-screen bg-white text-black fixed top-0 left-0 z-40 shadow-sm border-r-[1px] border-gray-300 transform -translate-x-full lg:translate-x-0`}
      >
        <div className="p-6 px-2">
          <div className={`flex items-center justify-start mb-10  pb-4`}>
            <div className="me-2 flex h-[40px] w-[40px] items-center justify-center rounded-md bg-zinc-950 text-white dark:bg-white dark:text-zinc-950">
              <Grid className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <h5 className="me-2 text-2xl font-bold leading-5 text-zinc-950 dark:text-white">
                Karoseri
              </h5>
              <p className="font-semibold text-sm text-zinc-950 dark:text-white">
                Super App
              </p>
            </div>
          </div>
          <div>
            {Object.entries(groupedNavItems).map(
              ([group, items], groupIndex) => (
                <div key={groupIndex} className="mb-6">
                  {/* Group Title */}
                  <h3 className="text-gray-600 uppercase text-sm font-bold mb-3">
                    {group}
                  </h3>

                  {/* Group Items */}
                  <ul className="space-y-6">
                    {items.map((item, index) => (
                      <li key={index}>
                        <div>
                          <div
                            onClick={() =>
                              item.subItems && handleToggleMenu(index)
                            }
                            className={`flex items-center justify-between hover:text-slate-900 transition-colors cursor-pointer`}
                          >
                            <Link
                              href={item.href}
                              className="flex items-center space-x-3 hover:scale-110 transition ease-in-out delay-75"
                            >
                              <i
                                className={`text-2xl ki-outline ${item.icon}`}
                              ></i>
                              <span className="font-semibold">
                                {item.label}
                              </span>
                            </Link>
                            {item.subItems && (
                              <i
                                className={`text-sm font-bold ki-outline ${
                                  openMenuIndex === index
                                    ? "ki-minus"
                                    : "ki-plus"
                                } text-gray-600 ml-auto hover:scale-110 transition ease-in-out delay-75`}
                              ></i>
                            )}
                          </div>

                          {/* Render SubItems */}
                          {item.subItems && openMenuIndex === index && (
                            <ul className="pl-6 mt-4 space-y-4 transition-all duration-300 ease-in-out">
                              {item.subItems.map((subItem, subIndex) => (
                                <li key={subIndex}>
                                  <Link
                                    href={subItem.href}
                                    className="flex items-center space-x-3 hover:text-blue-400 transition-colors"
                                  >
                                    <i
                                      className={`text-2xl ki-outline ${subItem.icon}`}
                                    ></i>
                                    <span className="font-semibold">
                                      {subItem.label}
                                    </span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
