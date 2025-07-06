"use client";

import { SignUpContextProvider } from "@/contexts/SignUpContext";
import { AuthLayout } from "@/layouts/auth";
import type { AppProps } from "next/app";
import { parseCookies } from "nookies";
import { Toaster } from "sonner";
import { AppLayout } from "../layouts/app";
import { globalStyles } from "../styles/global";
import { SignInContextProvider } from "@/contexts/SignInContext";
import { StoreContextProvider } from "@/contexts/StoreContext";
import { DefaultSeo } from "next-seo";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  const { "@edna:auth-token": token } = parseCookies();

  const Layout = token ? AppLayout : AuthLayout;

  return (
    <Layout>
      <DefaultSeo
        openGraph={{
          type: "website",
          locale: "pt_BR",
          url: "https://edna-web.vercel.app",
          siteName: "Edna Marketplace",
        }}
      />
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
