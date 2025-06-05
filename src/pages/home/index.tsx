import { useEffect, useState } from "react";
import { Header } from "@/components/header";
import { getCurrentPeriodMessage } from "@/utils/get-current-period-message";
import { Chart } from "./_components/Chart";
import { InfoCard } from "./_components/InfoCard";
import {
  Container,
  InfoCardContainer,
  Main,
  PendingOrdersContainer,
} from "./styles";

import {
  getWeekCustomersMetrics,
  GetWeekCustomersMetricsResponse,
} from "@/api/get-week-customers-metrics";

import {
  getWeekOrdersMetrics,
  GetWeekOrdersMetricsResponse,
} from "@/api/get-week-orders-metrics";

import {
  getWeekRevenueMetrics,
  GetWeekRevenueMetricsResponse,
} from "@/api/get-week-revenue-metrics";

import {
  fetchPendingOrders,
  PendingOrder,
} from "@/api/fetch-pending-orders-metrics";

import { PendingOrderList } from "./_components/PendingOrderList";

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [weekCustomers, setWeekCustomers] =
    useState<GetWeekCustomersMetricsResponse | null>(null);
  const [weekOrders, setWeekOrders] =
    useState<GetWeekOrdersMetricsResponse | null>(null);
  const [weekRevenue, setWeekRevenue] =
    useState<GetWeekRevenueMetricsResponse | null>(null);
  const [pendingOrders, setPendingOrders] = useState<PendingOrder[]>([]);

  useEffect(() => {
    async function loadMetrics() {
      const [customers, orders, revenue, pending] = await Promise.all([
        getWeekCustomersMetrics(),
        getWeekOrdersMetrics(),
        getWeekRevenueMetrics(),
        fetchPendingOrders(),
      ]);

      setWeekCustomers(customers);
      setWeekOrders(orders);
      setWeekRevenue(revenue);
      setPendingOrders(pending);
      setIsClient(true);
      setIsLoading(false);
    }

    loadMetrics();
  }, []);

  if (!isClient || isLoading || !weekCustomers || !weekOrders || !weekRevenue) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "#666" }}>
        Carregando métricas da semana...
      </div>
    );
  }

  const fixedRevenuePercentage =
    weekRevenue.total === 0 ? 0 : weekRevenue.percentageChange;

  const currentPeriodMessage = getCurrentPeriodMessage();

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
            value={weekOrders.newOrders}
            percentage={weekOrders.percentageChange}
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
            value={weekRevenue.total}
            percentage={fixedRevenuePercentage}
            type="currency"
          />
        </InfoCardContainer>

        <PendingOrdersContainer>
          <PendingOrderList orders={pendingOrders} />
        </PendingOrdersContainer>

        <Chart />
      </Main>
    </Container>
  );
}
