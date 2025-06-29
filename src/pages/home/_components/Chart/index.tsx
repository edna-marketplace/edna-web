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
} from "./styles";

import { useIsMobile } from "@/hooks/use-is-mobile";
import { Text } from "@/components/@ui/Text";
import { useEffect, useState } from "react";
import { fetchRevenueByPeriod } from "@/api/get-monthly-revenue-by-period-metrics";

export function Chart() {
  const [isClient, setIsClient] = useState(false);
  const [chartData, setChartData] = useState<
    { name: string; receita: number }[]
  >([]);

  useEffect(() => {
    async function load() {
      const revenuePeriodData = await fetchRevenueByPeriod();

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

      const finalData = revenuePeriodData.map((item) => ({
        name: meses[item.month - 1],
        receita: item.revenuePeriod,
      }));

      setChartData(finalData);
      setIsClient(true);
    }

    load();
  }, []);

  const isMobile = useIsMobile();

  if (!isClient) return null;

  const isChartEmpty = chartData.every((item) => item.receita === 0);

  return (
    <Container>
      <Header>
        <Title>Receita</Title>
        <PeriodSelector>
          <PeriodButton active={true}>1 ano</PeriodButton>
          <PeriodButton disabled>6 meses</PeriodButton>
          <PeriodButton disabled>3 meses</PeriodButton>
        </PeriodSelector>
      </Header>

      <Legend>
        <Dot />
        <span>Receita</span>
      </Legend>

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
