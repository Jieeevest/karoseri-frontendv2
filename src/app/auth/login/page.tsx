"use client";
import { Card, InputText, SuccessModal } from "@/components/atoms";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useLoginMutation } from "@/services/authApi";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [statusMessage, setStatusMessage] = useState({
    message: "",
    type: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [login, { isLoading }] = useLoginMutation();
  const [urls, setUrls] = useState<string | null>(null);

  useEffect(() => {
    const urlsParam = searchParams.get("urls");
    if (urlsParam) {
      setUrls(`https://${urlsParam}`);
    }
  }, [searchParams]);

  const validateForm = () => {
    const newErrors = {
      email: email ? "" : "Email is required.",
      password: password ? "" : "Password is required.",
    };

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => !error);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const response = await login({ email, password }).unwrap();
      const { token, fullName, role } = response?.data;

      localStorage.setItem("accessToken", token);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userName", fullName);
      localStorage.setItem("userRoleID", role.id);
      localStorage.setItem("userRole", role.name);

      setStatusMessage({
        message: "Logged in successfully!",
        type: "Success",
      });
      setSuccessModal(true);
      setTimeout(() => {
        if (urls) {
          router.push(`${urls}?token=${token}`);
        } else {
          router.push(`/workspace/dashboard`);
        }
      }, 3000);

      setTimeout(() => {}, 1000);
    } catch (err: any) {
      alert("Error");
    }
  };

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
        <Card isScrollable={true} height="500px">
          <div className="w-full px-10 mt-5 mb-5 flex justify-center pb-5 pt-2 border-b-[1px] border-gray-300">
            <h3 className="text-3xl font-bold ">Karoseri Super App</h3>
          </div>
          <form
            className="w-full h-full flex flex-col px-10"
            onSubmit={handleLogin}
          >
            <h1 className="text-xl font-bold text-gray-800 mb-5 text-left">
              Welcome Back!
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
              />
            </div>
            <div className="flex flex-col gap-4 w-full mt-4">
              <label className="text-gray-700 font-semibold">
                Password<span className="text-danger">*</span>
              </label>
              <InputText
                className="w-full rounded-md"
                type="password"
                size="lg"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.email}
              />
            </div>
            <button
              type="submit"
              className={`w-full py-2 mt-6 rounded-md ${
                isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"
              } text-white`}
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
            <div className="flex justify-end mt-4">
              <p className="text-xs text-gray-600">
                Can't remember your password?{" "}
                <Link href="/auth/forgot-password" className="text-blue-500">
                  Forgot Password
                </Link>
              </p>
            </div>
          </form>
        </Card>
      </div>
      {successModal && (
        <SuccessModal
          showModal={successModal}
          title={statusMessage?.type}
          message={statusMessage?.message}
          handleClose={() => setSuccessModal(false)}
        />
      )}
    </div>
  );
}
