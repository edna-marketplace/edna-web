import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
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
import {
  fetchRevenueByPeriod,
  RevenuePeriod,
} from "@/api/get-monthly-revenue-by-period-metrics";
import { Button } from "@/components/@ui/Button";
import {
  getMonthRevenueMetrics,
  GetMonthRevenueMetricsResponse,
} from "@/api/get-month-revenue-metrics";

export default function Home() {
  const [weekNewCustomers, setWeekNewCustomers] =
    useState<GetWeekCustomersMetricsResponse | null>(null);
  const [weekOrders, setWeekOrders] =
    useState<GetWeekOrdersMetricsResponse | null>(null);
  const [weekRevenue, setWeekRevenue] =
    useState<GetWeekRevenueMetricsResponse | null>(null);
  const [monthRevenue, setMonthRevenue] =
    useState<GetMonthRevenueMetricsResponse | null>(null);
  const [revenueByPeriod, setRevenueByPeriod] = useState<
    RevenuePeriod[] | null
  >(null);
  const [pendingOrders, setPendingOrders] = useState<PendingOrder[]>([]);

  async function getWeekCustomers() {
    const data = await getWeekCustomersMetrics();

    console.log("Week customers -> ", data);

    setWeekNewCustomers(data);
  }

  async function getWeekOrders() {
    const data = await getWeekOrdersMetrics();

    console.log("Week orders -> ", data);

    setWeekOrders(data);
  }

  async function getWeekRevenue() {
    const data = await getWeekRevenueMetrics();

    console.log("Week revenue -> ", data);

    setWeekRevenue(data);
  }

  async function getMonthRevenue() {
    const data = await getMonthRevenueMetrics();

    console.log("Month revenue -> ", data);

    setMonthRevenue(data);
  }

  async function fetchMonthlyRevenueByPeriod(period: number = 3) {
    const data = await fetchRevenueByPeriod(3);

    console.log("Monthly revenue -> ", data);

    setRevenueByPeriod(data);
  }

  // async function handleDownloadFinancialReport() {
  //   if (
  //     weekNewCustomers &&
  //     weekOrders &&
  //     weekRevenue &&
  //     monthRevenue &&
  //     revenueByPeriod
  //   ) {
  //     const { pdf } = await import("@react-pdf/renderer");
  //     const FinancialReportModule = await import(
  //       "@/components/FinancialReport"
  //     );
  //     const FinancialReport = FinancialReportModule.default;

  //     const reportData = {
  //       weekNewCustomers,
  //       weekOrders,
  //       weekRevenue,
  //       monthRevenue,
  //       revenueByPeriod,
  //     };

  //     const blob = await pdf(<FinancialReport {...reportData} />);

  //     const url = URL.createObjectURL(blob);
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.download = `relatorio-${new Date().toISOString().split("T")[0]}.pdf`;
  //     link.click();

  //     URL.revokeObjectURL(url);
  //   }
  // }

  useEffect(() => {
    getWeekCustomers();
    getWeekOrders();
    getWeekRevenue();
    getMonthRevenue();
    fetchMonthlyRevenueByPeriod();
  }, []);

  if (!weekNewCustomers || !weekOrders || !weekRevenue) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "#666" }}>
        Carregando métricas da semana...
      </div>
    );
  }

  const fixedRevenuePercentage =
    weekRevenue.weekRevenue === 0 ? 0 : weekRevenue.percentageChange;

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
            value={weekNewCustomers.newCustomers}
            percentage={weekNewCustomers.percentageChange}
            type="default"
          />
          <InfoCard
            title="Receita"
            value={weekRevenue.weekRevenue}
            percentage={fixedRevenuePercentage}
            type="currency"
          />
        </InfoCardContainer>

        <PendingOrdersContainer>
          <PendingOrderList orders={pendingOrders} />
        </PendingOrdersContainer>

        <Chart />

        <Button>Baixar relatório</Button>
      </Main>
    </Container>
  );
}
