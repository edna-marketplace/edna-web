import {
  getWeekCustomersMetrics,
  GetWeekCustomersMetricsResponse,
} from "@/api/get-week-customers-metrics";
import { Header } from "@/components/header";
import { getCurrentPeriodMessage } from "@/utils/get-current-period-message";
import { useEffect, useState } from "react";
import { Chart } from "./_components/Chart";
import { InfoCard } from "./_components/InfoCard";
import {
  Container,
  InfoCardContainer,
  Main,
  PendingOrdersContainer,
} from "./styles";

export default function Home() {
  const [weekCustomers, setWeekCustomers] =
    useState<GetWeekCustomersMetricsResponse>(
      {} as GetWeekCustomersMetricsResponse
    );
  const currentPeriodMessage = getCurrentPeriodMessage();

  const today = new Date();
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(today.getDate() - 7);

  const year = today.getFullYear();

  async function getWeekCustomers() {
    const data = await getWeekCustomersMetrics();

    setWeekCustomers(data);
  }

  useEffect(() => {
    getWeekCustomers();
  }, []);

  return (
    <Container>
      <Header
        title={currentPeriodMessage}
        description="Não se esqueça! Na edna seu brechó sempre é a prioridade!"
      />

      <Main>
        <InfoCardContainer>
          <InfoCard
            title="Pedidos"
            value={20}
            percentage={31.2}
            type="default"
          />
          <InfoCard
            title="Novos clientes"
            value={weekCustomers.newCustomers}
            percentage={weekCustomers.percentageChange}
            type="default"
          />
          <InfoCard
            title="Receita"
            value={987.61}
            percentage={-2.3}
            type="currency"
          />
        </InfoCardContainer>

        <PendingOrdersContainer>
          {/* <PendingOrderList orders={orders} /> */}
        </PendingOrdersContainer>

        <Chart />
      </Main>
    </Container>
  );
}
