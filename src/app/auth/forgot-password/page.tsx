"use client";
import { Card, InputText } from "@/components/atoms";
import Image from "next/image";
import React from "react";

export default function Login() {
  return (
    <div
      className="w-full h-screen absolute overflow-hidden flex justify-center items-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(159, 18, 28, 0.8), rgba(159, 18, 28, 0.8)), url('/siap-background-1.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="w-[500px] rounded-lg shadow-lg"
        style={{
          backgroundImage:
            "linear-gradient(rgba(159, 18, 28, 0.8), rgba(159, 18, 28, 0.8)), url('/siap-background-1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Card isScrollable={true} height="400px">
          <div className="w-full px-10 my-10  flex justify-center">
            <Image
              src="/siap-logo.png"
              alt="SIAP Logo"
              width={100}
              height={100}
            />
          </div>
          <div className="w-full h-full flex flex-col px-10">
            <h1 className="text-xl font-bold text-gray-800 mb-5 text-left">
              Forget Password
            </h1>
            <div className="flex flex-col gap-4 w-full">
              <label className="text-gray-700 font-semibold">
                Work Email<span className="text-danger">*</span>
              </label>
              <InputText
                className="w-full rounded-md"
                type="email"
                size="lg"
                placeholder="Enter your email"
              />
            </div>
            <button className="w-full bg-blue-500 text-white py-2 mt-6 rounded-md">
              Submit
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
