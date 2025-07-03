"use client";

import { SignUpContextProvider } from "@/contexts/SignUpContext";
import { AuthLayout } from "@/layouts/Auth";
import type { AppProps } from "next/app";
import { parseCookies } from "nookies";
import { Toaster } from "sonner";
import { AppLayout } from "../layouts/App";
import { globalStyles } from "../styles/global";
import { SignInContextProvider } from "@/contexts/SignInContext";
import { StoreContextProvider } from "@/contexts/StoreContext";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  const { "@edna:auth-token": token } = parseCookies();

  const Layout = token ? AppLayout : AuthLayout;

  return (
    <Layout>
      <SignUpContextProvider>
        <SignInContextProvider>
          <StoreContextProvider>
            <Toaster richColors position="top-right" />
            <Component {...pageProps} />
          </StoreContextProvider>
        </SignInContextProvider>
      </SignUpContextProvider>
    </Layout>
  );
}
