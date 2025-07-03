import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  CardTitle,
  ComparisonPercentage,
  Container,
  CurrentMonthContainer,
  CurrentMonthValuePercentage,
  Dot,
  Header,
  Legend,
  PeriodButton,
  PeriodSelector,
} from "./styles";

import {
  getMonthRevenueMetrics,
  GetMonthRevenueMetricsResponse,
} from "@/api/get-month-revenue-metrics";
import { fetchRevenueByPeriod } from "@/api/get-monthly-revenue-by-period-metrics";
import { Text } from "@/components/@ui/Text";
import { Spinner } from "@/components/Spinner";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { useEffect, useState } from "react";
import { Title } from "@/components/@ui/Title";
import { CaretDown, CaretUp, Minus } from "@phosphor-icons/react";

interface ChartDataType {
  name: string;
  receita: number;
}

interface ChartProps {
  monthRevenue: GetMonthRevenueMetricsResponse;
}

export function Chart({ monthRevenue }: ChartProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [period, setPeriod] = useState(6);
  const [chartData, setChartData] = useState<ChartDataType[]>([]);

  const isMobile = useIsMobile();

  async function fetchChartData() {
    const revenuePeriodData = await fetchRevenueByPeriod(period);

    const months = [
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

    const finalData = revenuePeriodData
      .map((item) => ({
        name: months[item.month - 1],
        receita: item.revenuePeriod,
      }))
      .reverse();

    setChartData(finalData);
  }

  function selectPeriod(period: number) {
    setPeriod(period);
  }

  useEffect(() => {
    setIsLoading(true);
    fetchChartData();
    setIsLoading(false);
  }, [period]);

  return (
    <Container>
      <Header>
        <CardTitle>Receita</CardTitle>
        <PeriodSelector>
          <PeriodButton onClick={() => selectPeriod(12)} active={period === 12}>
            1 ano
          </PeriodButton>
          <PeriodButton onClick={() => selectPeriod(6)} active={period === 6}>
            6 meses
          </PeriodButton>
          <PeriodButton onClick={() => selectPeriod(3)} active={period === 3}>
            3 meses
          </PeriodButton>
        </PeriodSelector>
      </Header>

      <CurrentMonthContainer>
        <div>
          <Text size="md" style={{ color: "var(--colors-base300)" }}>
            No Mês atual
          </Text>

          <CurrentMonthValuePercentage>
            <Title size="lg">
              {(monthRevenue.weekRevenue / 100).toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            </Title>

            <ComparisonPercentage
              isNegative={monthRevenue.percentageChange < 0}
            >
              <Text size="xs" weight="bold">
                {isLoading ? (
                  <Spinner />
                ) : (
                  `${Math.abs(monthRevenue.percentageChange)}%`
                )}
              </Text>
              {monthRevenue.percentageChange !== 0 ? (
                monthRevenue.percentageChange < 0 ? (
                  <CaretDown size={14} weight="bold" />
                ) : (
                  <CaretUp size={14} weight="bold" />
                )
              ) : (
                <Minus size={12} weight="bold" />
              )}
            </ComparisonPercentage>
          </CurrentMonthValuePercentage>
        </div>

        <Legend>
          <Dot />
          <span>Receita</span>
        </Legend>
      </CurrentMonthContainer>

      {isLoading ? (
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
          <Spinner />
        </div>
      ) : chartData.length === 0 ? (
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
        <ResponsiveContainer
          width="100%"
          height={220}
          style={{ padding: "2px" }}
        >
          <BarChart data={chartData}>
            <XAxis
              dataKey="name"
              tick={{ fill: "var(--colors-base400)", fontWeight: 700 }}
            />
            <YAxis
              tickFormatter={(value) => {
                const formattedValue = value / 100;
                return formattedValue >= 1000
                  ? `R$ ${formattedValue / 1000}k`
                  : `R$ ${formattedValue}`;
              }}
              tick={{ fill: "var(--colors-base400)", fontWeight: 700 }}
              tickLine={false}
              axisLine={false}
            />
            <CartesianGrid
              vertical={false}
              strokeDasharray="16 16"
              stroke="var(--colors-base400)"
            />
            <Tooltip
              formatter={(value: number) => {
                const formattedValue = value / 100;
                const displayValue =
                  formattedValue >= 1000
                    ? `R$ ${formattedValue / 1000}k`
                    : `R$ ${formattedValue}`;
                return [displayValue, "Receita"];
              }}
            />
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
