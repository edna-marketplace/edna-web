import { SpecialTitle } from "@/components/@ui/SpecialTitle";
import { Container, Main } from "./styles";
import { Header } from "@/components/Header";
import { getCurrentPeriodMessage } from "@/utils/get-current-period-message";

export default function Home() {

  const currentPeriodMessage = getCurrentPeriodMessage();

  return (
    <Container>
      <Header
        title={currentPeriodMessage}
        description="Não se esqueça! Na edna seu brechó sempre é a prioridade!"
      />

      <Main>
        <SpecialTitle>Home</SpecialTitle>
      </Main>
    </Container>
  )
}