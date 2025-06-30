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
  const [isLoading, setIsLoading] = useState(false);
  const [weekNewCustomers, setWeekNewCustomers] =
    useState<GetWeekCustomersMetricsResponse | null>(null);
  const [weekOrders, setWeekOrders] =
    useState<GetWeekOrdersMetricsResponse | null>(null);
  const [weekRevenue, setWeekRevenue] = useState<GetWeekRevenueMetricsResponse>(
    { weekRevenue: 0, percentageChange: 0 }
  );
  const [monthRevenue, setMonthRevenue] =
    useState<GetMonthRevenueMetricsResponse>({
      weekRevenue: 0,
      percentageChange: 0,
    });
  const [revenueByPeriod, setRevenueByPeriod] = useState<
    RevenuePeriod[] | null
  >(null);
  const [pendingOrders, setPendingOrders] = useState<PendingOrder[]>([]);

  async function getWeekCustomers() {
    const data = await getWeekCustomersMetrics();

    setWeekNewCustomers(data);
  }

  async function getWeekOrders() {
    const data = await getWeekOrdersMetrics();

    setWeekOrders(data);
  }

  async function getWeekRevenue() {
    const data = await getWeekRevenueMetrics();

    setWeekRevenue(data);
  }

  async function getMonthRevenue() {
    const data = await getMonthRevenueMetrics();

    setMonthRevenue(data);
  }

  async function getPendingOrders() {
    const data = await fetchPendingOrders();

    const cuttedPendingOrdersdata = data.splice(0, 8);

    setPendingOrders(cuttedPendingOrdersdata);
  }

  async function fetchMonthlyRevenueByPeriod(period: number = 3) {
    const data = await fetchRevenueByPeriod(3);

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
    setIsLoading(true);
    getWeekCustomers();
    getWeekOrders();
    getWeekRevenue();
    getMonthRevenue();
    getPendingOrders();
    fetchMonthlyRevenueByPeriod();
    setIsLoading(false);
  }, []);

  const currentPeriodMessage = getCurrentPeriodMessage();

  return (
    <Container>
      <Header
        title={currentPeriodMessage}
        description="Não se esqueça! Na edna seu brechó cresce mais!"
      />

      <Main>
        <InfoCardContainer>
          <InfoCard
            title="Pedidos"
            value={weekOrders ? weekOrders.newOrders : 0}
            percentage={weekOrders ? weekOrders.percentageChange : 0}
            type="default"
            isLoading={isLoading}
          />
          <InfoCard
            title="Novos clientes"
            value={weekNewCustomers ? weekNewCustomers.newCustomers : 0}
            percentage={
              weekNewCustomers ? weekNewCustomers.percentageChange : 0
            }
            type="default"
            isLoading={isLoading}
          />
          <InfoCard
            title="Receita"
            value={weekRevenue ? weekRevenue.weekRevenue : 0}
            percentage={weekRevenue ? weekRevenue.percentageChange : 0}
            type="currency"
            isLoading={isLoading}
          />
        </InfoCardContainer>

        <PendingOrdersContainer>
          <PendingOrderList orders={pendingOrders} isLoading={isLoading} />
        </PendingOrdersContainer>

        <Chart monthRevenue={monthRevenue} />

        {/* <Button>Baixar relatório</Button> */}
      </Main>
    </Container>
  );
}
