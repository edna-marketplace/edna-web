import { SpecialTitle } from '@/components/@ui/SpecialTitle'
import { Container, Main } from './styles'
import { Header } from '@/components/Header'

export default function Orders() {
  return (
    <Container>
      <Header
        title="Pedidos"
        description="Essa é a área dos seus pedidos, aqui você pode gerenciar todos os pedidos que seus clientes fizeram."
      />
      <Main>
        <SpecialTitle>Orders</SpecialTitle>
      </Main>
    </Container>
  )
}
