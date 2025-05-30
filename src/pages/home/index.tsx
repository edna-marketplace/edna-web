import { getCurrentPeriodMessage } from '@/utils/get-current-period-message'
import { Container, InfoCardContainer, Main, PendingOrdersContainer } from './styles'
import { InfoCard } from './_components/InfoCard'
import { Header } from '@/components/header'
import { PendingOrderList } from './_components/PendingOrderList'
import { Chart } from './_components/Chart'


export default function Home() {
  const currentPeriodMessage = getCurrentPeriodMessage()

  const orders = [
    {
      id: "1",
      name: "Jaqueta de couro",
      date: "16/05"
    },
    {
      id: "2",
      name: "Camiseta da Nike",
      date: "15/05"
    },
    {
      id: "3",
      name: "Order 4",
      date: "14/05"
    },
    {
      id: "4",
      name: "Order 5",
      date: "13/05"
    },
    {
      id: "5",
      name: "Order 6",
      date: "12/05"
    },
    {
      id: "6",
      name: "Order 7",
      date: "11/05"
    },
    {
      id: "7",
      name: "Order 8",
      date: "10/05"
    },
    {
      id: "8",
      name: "Order 9",
      date: "09/05"
    },
    {
      id: "9",
      name: "Order 10",
      date: "08/05"
    },
  ]

  return (
    <Container>
      <Header
        title={currentPeriodMessage}
        description="Não se esqueça! Na edna seu brechó sempre é a prioridade!"
      />

      <Main>
        <InfoCardContainer>
          <InfoCard
            title='Pedidos'
            value={26}
            percentage={31.2}
            type='default'
          />
          <InfoCard
            title='Novos clientes'
            value={11}
            percentage={110}
            type='default'
          />
          <InfoCard
            title='Receita'
            value={987.61}
            percentage={-2.3}
            type='currency'
          />
        </InfoCardContainer>
        <PendingOrdersContainer>
          <PendingOrderList orders={orders} />
        </PendingOrdersContainer>
        <Chart />
      </Main>
    </Container>
  )
}
