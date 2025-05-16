import { getCurrentPeriodMessage } from '@/utils/get-current-period-message'
import { Container, InfoCardContainer, Main } from './styles'
import { InfoCard } from './_components/InfoCard'
import { Header } from '@/components/header'
import { PendingOrderList } from './_components/PendingOrderList'


export default function Home() {
  const currentPeriodMessage = getCurrentPeriodMessage()

  const orders = [
    {
      id: "1",
      name: "Order 1",
      date: "16/05"
    },
    {
      id: "2",
      name: "Order 2",
      date: "15/05"
    },
    {
      id: "3",
      name: "Order 3",
      date: "14/05"
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
        <PendingOrderList orders={orders} />
        <div>a</div>
        {/* Grafico - rowspan 2 */}
      </Main>
    </Container>
  )
}
