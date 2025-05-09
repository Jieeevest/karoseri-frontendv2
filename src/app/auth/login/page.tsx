"use client";
import { Card, InputText, SuccessModal } from "@/components/atoms";
import React, { useState, useEffect, Suspense } from "react";
import { useLoginMutation } from "@/services/authApi";
import { useRouter, useSearchParams } from "next/navigation";

const UrlFetcher = ({ setUrls }: { setUrls: (url: string | null) => void }) => {
  const searchParams = useSearchParams();
  const urlsParam = searchParams.get("urls");

  useEffect(() => {
    if (urlsParam) {
      setUrls(`http://${urlsParam}`);
    }
  }, [urlsParam]);

  return null;
};

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ message: "", type: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [login, { isLoading }] = useLoginMutation();
  const [urls, setUrls] = useState<string | null>(null);

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newErrors = {
      email: !email
        ? "Email is required."
        : !emailRegex.test(email)
        ? "Invalid email format."
        : "",
      password: !password ? "Password is required." : "",
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

      setStatusMessage({ message: "Logged in successfully!", type: "Success" });
      setSuccessModal(true);

      setTimeout(() => {
        router.push(urls ? `${urls}?token=${token}` : `/workspace/employees`);
      }, 3000);
    } catch (err: any) {
      setStatusMessage({
        message: err?.data?.message || "An error occurred. Please try again.",
        type: "Error",
      });
      setSuccessModal(true);
    }
  };

  return (
    <div className="w-full h-screen absolute overflow-hidden flex justify-center items-center bg-gradient-to-br from-slate-700 to-slate-600">
      <Suspense fallback={null}>
        <UrlFetcher setUrls={setUrls} />
      </Suspense>

      <div className="w-[500px] rounded-lg shadow-lg">
        <Card height="500px">
          <form
            className="w-full h-full flex flex-col px-10 pb-8 pt-4"
            onSubmit={handleLogin}
          >
            <h1 className="text-xl font-bold text-gray-800 mb-5 text-left">
              SIGN IN
            </h1>
            <div className="flex flex-col gap-4 w-full">
              <label className="text-gray-700 font-semibold">
                Email<span className="text-danger">*</span>
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
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white`}
              disabled={isLoading}
            >
              <p className="flex items-center justify-center gap-1">
                {isLoading ? "Signing In..." : "Sign In"}
                <i className="ki-outline ki-arrow-right text-white"></i>
              </p>
            </button>
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
