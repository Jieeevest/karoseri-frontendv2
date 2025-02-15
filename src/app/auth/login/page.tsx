"use client";
import { Card, InputText, SuccessModal } from "@/components/atoms";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useLoginMutation } from "@/services/authApi";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Grid } from "lucide-react";

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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordMinLength = 8;

    const newErrors = {
      email: !email
        ? "Email is required."
        : !emailRegex.test(email)
        ? "Invalid email format."
        : "",

      password: !password
        ? "Password is required."
        : // : password.length < passwordMinLength
          // ? `Password must be at least ${passwordMinLength} characters long.`
          // : !/[A-Z]/.test(password)
          // ? "Password must contain at least one uppercase letter."
          // : !/[a-z]/.test(password)
          // ? "Password must contain at least one lowercase letter."
          // : !/\d/.test(password)
          // ? "Password must contain at least one number."
          // : !/[!@#$%^&*(),.?":{}|<>]/.test(password)
          // ? "Password must contain at least one special character."
          "",
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
          router.push(`/workspace/employees`);
        }
      }, 3000);

      setTimeout(() => {}, 1000);
    } catch (err: any) {
      console.log(err);
      setStatusMessage({
        message: err?.data?.message || "An error occurred. Please try again.",
        type: "Error",
      });
      setSuccessModal(true);
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
        <Card height="500px">
          <div className={`flex items-center ml-10 mb-5 mt-5`}>
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
          <form
            className="w-full h-full flex flex-col px-10 pb-8"
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
                type="text"
                size="lg"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setErrors({ ...errors, email: "" });
                  setEmail(e.target.value);
                }}
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
                onChange={(e) => {
                  setErrors({ ...errors, password: "" });
                  setPassword(e.target.value);
                }}
                error={errors.password}
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
