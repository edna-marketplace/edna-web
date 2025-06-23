import { Header } from '@/components/header'
import { Container, Main } from './styles'
import { FilterForm, FilterFormData, FilterFormSchema } from './_components/FilterForm'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { orderStatus } from '@/utils/enums'
import { Card } from '@/components/@ui/Card'
import { Table } from './_components/Table/styles'
import { Button } from '@edna-ui/react'
import { ArrowRight, MagnifyingGlass, SlidersHorizontal, X } from '@phosphor-icons/react'

export default function Orders() {
  // const [clothes, setClothes] = useState<OrderStatus[]>([])

  const mockOrders = [
    {
      id: 1,
      date: "23/06/2025",
      customer: "João da Silva",
      item: "Camiseta Nike Dri-FIT",
      status: "Pendente",
      value: "R$ 120,00",
    },
    {
      id: 2,
      date: "20/06/2025",
      customer: "Maria Oliveira",
      item: "Calça Adidas Essentials",
      status: "Concluído",
      value: "R$ 200,00",
    },
  ]

  const router = useRouter()

  const { register, handleSubmit, control, reset } = useForm<FilterFormData>({
    resolver: zodResolver(FilterFormSchema)
  })

  async function handleClearFilters() {
    reset({
      clotheName: "",
      customerName: "",
      // orderStatus: "ALL"
    })
  }

  // async function handleFetchClotheOrdersWithFilter(data: FilterFormData) {
  //   const response = await fetchOrdersWithFilter({
  //     name: data.clotheName,
  //     customerName: data.customerName,
  //     orderStatus: data.orderStatus,
  //   })
  //   setOrders(response.clothes)
  // }

  return (
    <Container>
      <Header
        title="Pedidos"
        description="Essa é a área dos seus pedidos, aqui você pode gerenciar todos os pedidos que seus clientes fizeram."
      />
      <Main>
        <form>
          <FilterForm
            register={register}
            control={control}
            handleClearFilters={handleClearFilters}
          />
        </form>
        <Card>
          <Table.Root>
            <Table.Row>
              <Table.Head></Table.Head>
              <Table.Head>Data</Table.Head>
              <Table.Head>Cliente</Table.Head>
              <Table.Head>Peça</Table.Head>
              <Table.Head>Status</Table.Head>
              <Table.Head>Valor</Table.Head>
            </Table.Row>
            <Table.Body>
              {mockOrders.map((order) => (
                <Table.Row key={order.id}>
                  <Table.Cell>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => alert(`Aprovado pedido #${order.id}`)}
                      style={{width:"5px"}}
                    >
                      <MagnifyingGlass size={20} />
                    </Button>
                  </Table.Cell>
                  <Table.Cell>{order.date}</Table.Cell>
                  <Table.Cell>{order.customer}</Table.Cell>
                  <Table.Cell>{order.item}</Table.Cell>
                  <Table.Cell>{order.status}</Table.Cell>
                  <Table.Cell>{order.value}</Table.Cell>
                  <Table.Cell>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => alert(`Aprovado pedido #${order.id}`)}
                        style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        <ArrowRight size={16} />
                        Aprovar
                      </Button>
                      <Button
                        type='button'
                        variant="tertiary"
                        onClick={handleClearFilters}>
                        <X size={16} />
                        Limpar
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Card>
      </Main>
    </Container >
  )
}
