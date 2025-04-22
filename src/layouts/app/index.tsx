import { Header } from "@/components/header"
import { NavBar } from "@/components/nav-bar"
import { Container } from "./styles"

export interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <Container>
      <NavBar />

      <Header />

      <div>{children}</div>
    </Container>
  )
}