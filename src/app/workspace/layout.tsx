"use client";
import Loading from "@/components/molecules/Loading";
import Navbar from "@/components/molecules/Navbar";
import Sidebar from "@/components/molecules/Sidebar";
import { useGetUserQuery } from "@/services/authApi";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function WorkspaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const router = useRouter();
  // const { isLoading, error } = useGetUserQuery<any>();
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   if (error) {
  //     setLoading(true);
  //     if (error?.data?.code !== 200) {
  //       localStorage.removeItem("accessToken");
  //       setTimeout(() => {
  //         router.push("/auth/login");
  //       }, 500);
  //     } else {
  //       setLoading(false);
  //     }
  //   } else {
  //     setLoading(false);
  //   }
  // }, [error, router]);

  // if (isLoading || loading) {
  //   return <Loading />;
  // }

  return (
    <div className="flex h-screen relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        // style={{ backgroundImage: "url('/siap-background-1.png')" }}
      />

      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative">
        {/* Navbar */}
        <div className="w-full">
          <Navbar />
        </div>

        {children}
      </div>
    </div>
  );
}
