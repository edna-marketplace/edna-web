import { SpecialTitle } from "@edna-ui/react";
import { Container } from "./styles";
import { Header } from "@/components/header";

export default function Orders() {
  return (
    <Container>
      <Header
        title="Pedidos"
        description="Essa é a área dos seus pedidos, aqui você pode gerenciar todos os pedidos que seus clientes fizeram."
      />
      <SpecialTitle>Orders</SpecialTitle>
    </Container>
  )
}