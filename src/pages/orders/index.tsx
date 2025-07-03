import { awaitWithdrawalOrder } from '@/api/await-withdrawal-order'
import { completeOrder } from '@/api/complete-order'
import { fetchOrdersWithFilter, StoreOrderDTO } from '@/api/fetch-orders-with-filter'
import { Card } from '@/components/@ui/Card'
import { Header } from '@/components/header'
import { Button } from '@edna-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, MagnifyingGlass, X } from '@phosphor-icons/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { FilterForm, FilterFormData, FilterFormSchema } from './_components/FilterForm'
import { Table } from './_components/Table/styles'
import { Container, Main } from './styles'
import { cancelOrder } from '@/api/cancel-order'

export default function Orders() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>();
  const [orders, setOrders] = useState<StoreOrderDTO[]>([]);

  const router = useRouter()

  const { register, handleSubmit, control, reset } = useForm<FilterFormData>({
    resolver: zodResolver(FilterFormSchema),
  });

  function handleClotheDetails(orderId: string) {
    router.push(`/orders/${orderId}`);
  }

  function handlePaginate(pageIndex: number) {
    setCurrentPage(pageIndex);
  }

  async function handleStatusAction(order: StoreOrderDTO) {
    try {
      if (order.orderStatus === 'PENDING') {
        await awaitWithdrawalOrder(order.orderId)
        toast.success('Pedido marcado como aguardando retirada.')
      } else if (order.orderStatus === 'AWAITING_WITHDRAWAL') {
        await completeOrder(order.orderId)
        toast.success('Pedido marcado como concluído.')
      } else {
        toast.info('Esse pedido não permite ações.')
        return
      }

      await handleFetchOrdersWithFilter({})
    } catch (error: any) {
      toast.error('Erro ao processar o pedido.', {
        description:
          error?.response?.data?.message ||
          'Tente novamente mais tarde.',
      })
    }
  }

  async function handleCancelOrder(orderId: string) {
    try {
      await cancelOrder(orderId)
      toast.success('Pedido cancelado com sucesso.')
      await handleFetchOrdersWithFilter({})
    } catch (error: any) {
      toast.error('Erro ao cancelar pedido.', {
        description:
          error?.response?.data?.message ||
          'Tente novamente mais tarde.',
      })
    }
  }

  async function handleFetchOrdersWithFilter(data: FilterFormData) {
    const response = await fetchOrdersWithFilter({
      page: currentPage,
      clotheName: data.clotheName,
      customerName: data.customerName,
      orderStatus: data.orderStatus,
    });
    setOrders(response.orders);
    setTotalCount(response.meta.totalCount);
  }

  async function handleClearFilters() {
    reset({
      clotheName: "",
      customerName: "ALL",
      orderStatus: "ALL",
    });
    handleFetchOrdersWithFilter({});
  }

  useEffect(() => {
    setIsLoading(true);
    handleFetchOrdersWithFilter({});
    setIsLoading(false);
  }, [currentPage]);

  return (
    <Container>
      <Header
        title="Pedidos"
        description="Essa é a área dos seus pedidos, aqui você pode gerenciar todos os pedidos que seus clientes fizeram."
      />
      <Main>
        <form onSubmit={handleSubmit(handleFetchOrdersWithFilter)}>
          <FilterForm
            register={register}
            control={control}
            handleClearFilters={handleClearFilters}
          />
        </form>

        <Card>
          <div style={{ overflowX: 'auto' }}>
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
                {orders.map((order) => (
                  <Table.Row key={order.orderId}>
                    <Table.Cell>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => alert(`Aprovado pedido #${order.orderStatus}`)}
                        style={{ width: "5px" }}
                      >
                        <MagnifyingGlass size={20} />
                      </Button>
                    </Table.Cell>
                    <Table.Cell>{order.createdAt}</Table.Cell>
                    <Table.Cell>{order.customerName}</Table.Cell>
                    <Table.Cell>{order.clotheName}</Table.Cell>
                    <Table.Cell>{order.orderStatus}</Table.Cell>
                    <Table.Cell>{order.priceInCents}</Table.Cell>
                    <Table.Cell>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <Button
                          variant="primary"
                          size="sm"
                          disabled={order.orderStatus !== 'PENDING'}
                          onClick={() => handleStatusAction(order)}
                          style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                        >
                          <ArrowRight size={16} />
                          {order.orderStatus === 'PENDING' && 'Aprovar'}
                          {order.orderStatus === 'COMPLETED' && 'Concluído'}
                          {order.orderStatus === 'AWAITING_WITHDRAWAL' && 'Aguardando retirada'}
                          {order.orderStatus === 'CANCELED' && 'Cancelado'}
                        </Button>

                        <Button
                          type='button'
                          variant="tertiary"
                          onClick={() => handleCancelOrder(order.orderId)}>
                          <X size={16} />
                          Cancelar
                        </Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </div>
        </Card>
      </Main>
    </Container >
  )
}
