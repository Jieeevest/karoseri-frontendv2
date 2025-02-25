"use client";
import { Card, InputText } from "@/components/atoms";
import React, { useState, useEffect, Suspense } from "react";
import { useLoginMutation } from "@/services/authApi";
import { useRouter, useSearchParams } from "next/navigation";

const UrlFetcher = ({ setUrls }: { setUrls: (url: string | null) => void }) => {
  const searchParams = useSearchParams();
  const urlsParam = searchParams.get("urls");

  useEffect(() => {
    if (urlsParam) {
      setUrls(`https://${urlsParam}`);
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

  return (
    <div className="w-full h-screen absolute overflow-hidden flex justify-center items-center">
      <Suspense fallback={null}>
        <UrlFetcher setUrls={setUrls} />
      </Suspense>

      <div className="w-[500px] rounded-lg shadow-lg">
        <Card height="500px">
          <form className="w-full h-full flex flex-col px-10 pb-8">
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
            <button
              type="submit"
              className={`w-full py-2 mt-6 rounded-md ${
                isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"
              } text-white`}
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </Card>
      </div>
    </div>
  );
}
