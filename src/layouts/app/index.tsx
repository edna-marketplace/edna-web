import { Header } from "@/components/header"
import { NavBar } from "@/components/nav-bar"
import { Container, Main } from "./styles"
import { useRouter } from "next/router";

export interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  
  return (
    <Container>
      <NavBar />

      {children}
    </Container>
  )
}