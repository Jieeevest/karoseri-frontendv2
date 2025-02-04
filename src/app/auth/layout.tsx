"use client";

import { Provider } from "react-redux";
import { store } from "../../services/store";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Provider store={store}>{children}</Provider>;
}
