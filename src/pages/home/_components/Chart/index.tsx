import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import {
  Container,
  Header,
  Title,
  PeriodSelector,
  PeriodButton,
  Legend,
  Dot,
  ChartInfoRow,
  ChangeIndicator,
} from "./styles";

import { useIsMobile } from "@/hooks/use-is-mobile";
import { CaretDown, CaretUp } from "@phosphor-icons/react";
import { Text } from "@/components/@ui/Text";
import { useEffect, useState } from "react";

import { getWeekOrdersMetrics } from "@/api/get-week-orders-metrics";
import { getWeekCustomersMetrics } from "@/api/get-week-customers-metrics";

export function Chart() {
  const [isClient, setIsClient] = useState(false);
  const [chartData, setChartData] = useState<
    { name: string; receita: number }[]
  >([]);

  const [weekRevenueMetrics, setWeekRevenueMetrics] = useState({
    newOrders: 0,
    percentageChange: 0,
  });

  const [weekCustomerMetrics, setWeekCustomerMetrics] = useState({
    newCustomers: 0,
    percentageChange: 0,
  });

  useEffect(() => {
    async function load() {
      const year = new Date().getFullYear();

      const [ordersResponse, revenueMetrics, customerMetrics] =
        await Promise.all([
          fetchCustomerOrders({ status: "COMPLETED", year }),
          getWeekOrdersMetrics(),
          getWeekCustomersMetrics(),
        ]);

      const { orders } = ordersResponse;

      const meses = [
        "JAN",
        "FEV",
        "MAR",
        "ABR",
        "MAI",
        "JUN",
        "JUL",
        "AGO",
        "SET",
        "OUT",
        "NOV",
        "DEZ",
      ];

      const receitaPorMes: Record<string, number> = {};
      meses.forEach((mes) => (receitaPorMes[mes] = 0));

      orders.forEach((order) => {
        const data = new Date(order.createdAt);
        const mes = meses[data.getMonth()];
        receitaPorMes[mes] += order.total;
      });

      const finalData = meses.map((mes) => ({
        name: mes,
        receita: receitaPorMes[mes],
      }));

      setChartData(finalData);
      setWeekRevenueMetrics(revenueMetrics);
      setWeekCustomerMetrics(customerMetrics);
    }

    setIsClient(true);
    load();
  }, []);

  const isMobile = useIsMobile();

  if (!isClient) return null;

  const isChartEmpty = chartData.every((item) => item.receita === 0);
  const isRevenueNegative = weekRevenueMetrics.percentageChange < 0;

  return (
    <Container>
      <Header>
        <Title>Receita</Title>
        <PeriodSelector>
          <PeriodButton active={true}>1 ano</PeriodButton>
          <PeriodButton>6 meses</PeriodButton>
          <PeriodButton>3 meses</PeriodButton>
        </PeriodSelector>
      </Header>

      <ChartInfoRow>
        <div>
          <Text size="sm" css={{ color: "$base300" }}>
            No mês atual
          </Text>
          <Text size="lg" weight="bold">
            {weekRevenueMetrics.newOrders.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
            <ChangeIndicator isNegative={isRevenueNegative}>
              <Text size="sm" weight="bold">
                {Math.abs(weekRevenueMetrics.percentageChange).toFixed(1)}%
              </Text>
              {isRevenueNegative ? (
                <CaretDown size={14} weight="bold" />
              ) : (
                <CaretUp size={14} weight="bold" />
              )}
            </ChangeIndicator>
          </Text>
        </div>

        <Legend>
          <Dot />
          <span>Receita</span>
        </Legend>
      </ChartInfoRow>

      {isChartEmpty ? (
        <div
          style={{
            width: "100%",
            height: 220,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--colors-base400)",
            fontWeight: 500,
          }}
        >
          <Text size="sm">Sem dados disponíveis</Text>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartData}>
            <XAxis
              dataKey="name"
              tick={{ fill: "var(--colors-base400)", fontWeight: 700 }}
            />
            <YAxis
              tickFormatter={(value) => `R$ ${Math.floor(value / 1000)}k`}
              tick={{ fill: "var(--colors-base400)", fontWeight: 700 }}
              tickLine={false}
              axisLine={false}
            />
            <CartesianGrid
              vertical={false}
              strokeDasharray="16 16"
              stroke="var(--colors-base400)"
            />
            <Tooltip />
            <Bar
              dataKey="receita"
              fill="var(--colors-base200)"
              radius={[3, 3, 0, 0]}
              barSize={isMobile ? 12 : 24}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Container>
  );
}
