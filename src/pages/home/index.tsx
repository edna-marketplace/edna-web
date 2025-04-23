import { SpecialTitle } from "@edna-ui/react";
import { Container } from "./styles";
import { Header } from "@/components/header";
import { getCurrentPeriodMessage } from "@/utils/get-current-period-message";

export default function Home() {

  const currentPeriodMessage = getCurrentPeriodMessage();

  return (
    <Container>
      <Header
        title={currentPeriodMessage}
        description="Não se esqueça! Na edna seu brechó sempre é a prioridade!"
      />
      <SpecialTitle>Home</SpecialTitle>
    </Container>
  )
}