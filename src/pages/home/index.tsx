import { getCurrentPeriodMessage } from '@/utils/get-current-period-message'
import { Container, InfoCardContainer, Main } from './styles'
import { InfoCard } from './_components/InfoCard'
import { Header } from '@/components/header'


export default function Home() {
  const currentPeriodMessage = getCurrentPeriodMessage()

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
      </Main>
    </Container>
  )
}
