import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'
import {
  Container,
  Header,
  Title,
  PeriodSelector,
  PeriodButton,
  Legend,
  Dot
} from './styles'

const data = [
  { name: 'JAN', pedidos: 38 },
  { name: 'FEV', pedidos: 24 },
  { name: 'MAR', pedidos: 18 },
  { name: 'ABR', pedidos: 55 },
  { name: 'MAI', pedidos: 36 },
  { name: 'JUN', pedidos: 37 },
  { name: 'JUL', pedidos: 26 },
  { name: 'AGO', pedidos: 33 },
  { name: 'SET', pedidos: 55 },
  { name: 'OUT', pedidos: 38 },
  { name: 'NOV', pedidos: 0 },
  { name: 'DEZ', pedidos: 0 },
]

export function Chart() {
  return (
    <Container>
      <Header>
        <Title>Pedidos</Title>
        <PeriodSelector>
          <PeriodButton active>1 ano</PeriodButton>
          <PeriodButton>6 meses</PeriodButton>
          <PeriodButton>3 meses</PeriodButton>
        </PeriodSelector>
      </Header>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="pedidos" fill="#57534e" radius={[6, 6, 0, 0]} barSize={24} />
        </BarChart>
      </ResponsiveContainer>

      <Legend>
        <Dot />
        <span>Pedidos</span>
      </Legend>
    </Container>
  )
}
