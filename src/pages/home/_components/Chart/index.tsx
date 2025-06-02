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
import { CaretDown } from "@phosphor-icons/react";
import { Text } from "@/components/@ui/Text"
import { useEffect, useState } from "react";

const data = [
  { name: "JAN", receita: 3500 },
  { name: "FEV", receita: 3200 },
  { name: "MAR", receita: 2900 },
  { name: "ABR", receita: 1900 },
  { name: "MAI", receita: 5800 },
  { name: "JUN", receita: 5500 },
  { name: "JUL", receita: 3000 },
  { name: "AGO", receita: 3700 },
  { name: "SET", receita: 5100 },
  { name: "OUT", receita: 3800 },
  { name: "NOV", receita: 100 },
  { name: "DEZ", receita: 0 },
];

export function Chart() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const isMobile = useIsMobile()

  if (!isClient) return null

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
          <Text size="sm" css={{ color: '$base300' }}>No mês atual</Text>
          <Text size="lg" weight="bold">
            R$ 4727,43
            <ChangeIndicator isNegative={true}>
              <Text size="sm" weight="bold">12,4%</Text>
              <CaretDown size={14} weight="bold" />
            </ChangeIndicator>
          </Text>
        </div>

        <Legend>
          <Dot />
          <span>Receita</span>
        </Legend>
      </ChartInfoRow>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            tick={{
              color: 'var(--colors-base400)',
            }}

          />
          <YAxis
            tickFormatter={(value) => `R$ ${Math.floor(value / 1000)}k`}
            tick={{
              fill: 'var(--colors-base400)',
              fontWeight: 700,
            }}

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
    </Container>
  );
}
