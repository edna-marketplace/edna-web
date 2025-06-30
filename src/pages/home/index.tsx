import { Header } from "@/components/Header";
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

import {
  getMonthRevenueMetrics,
  GetMonthRevenueMetricsResponse,
} from "@/api/get-month-revenue-metrics";
import {
  fetchRevenueByPeriod,
  RevenuePeriod,
} from "@/api/get-monthly-revenue-by-period-metrics";
import { Button } from "@/components/@ui/Button";
import { downloadFinancialReport } from "@/utils/download-financial-report";
import { DownloadSimple } from "@phosphor-icons/react";
import { PendingOrderList } from "./_components/PendingOrderList";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [weekNewCustomers, setWeekNewCustomers] =
    useState<GetWeekCustomersMetricsResponse>({
      newCustomers: 0,
      percentageChange: 0,
    });
  const [weekOrders, setWeekOrders] = useState<GetWeekOrdersMetricsResponse>({
    newOrders: 0,
    percentageChange: 0,
  });
  const [weekRevenue, setWeekRevenue] = useState<GetWeekRevenueMetricsResponse>(
    { weekRevenue: 0, percentageChange: 0 }
  );
  const [monthRevenue, setMonthRevenue] =
    useState<GetMonthRevenueMetricsResponse>({
      weekRevenue: 0,
      percentageChange: 0,
    });
  const [revenueByPeriod, setRevenueByPeriod] = useState<RevenuePeriod[]>([]);
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
    const data = await fetchRevenueByPeriod(12);

    setRevenueByPeriod(data);
  }

  function handleDownloadFinancialReport() {
    if (weekOrders && weekRevenue && weekNewCustomers && revenueByPeriod) {
      downloadFinancialReport({
        weekOrders,
        weekRevenue,
        weekNewCustomers,
        revenueByPeriod,
      });
    }
  }

  const currentPeriodMessage = getCurrentPeriodMessage();

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

  return (
    <Container>
      <Header
        title={currentPeriodMessage}
        description="Não se esqueça! Na edna seu brechó cresce mais!"
      />

      <Main>
        <Button
          style={{ position: "absolute", right: 32, top: -22 }}
          variant="secondary"
          size="sm"
          onClick={handleDownloadFinancialReport}
        >
          <DownloadSimple />
          Exportar para PDF
        </Button>
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
      </Main>
    </Container>
  );
}
