import { awaitWithdrawalOrder } from '@/api/await-withdrawal-order'
import { completeOrder } from '@/api/complete-order'
import {
  fetchOrdersWithFilter,
  StoreOrderDTO,
} from '@/api/fetch-orders-with-filter'
import { fetchAllStoreOrders } from '@/api/fetch-all-store-orders'
import { Card } from '@/components/@ui/Card'
import { Header } from '@/components/header'
import { Button, Title } from '@edna-ui/react'
import { Text } from '@/components/@ui/Text'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, MagnifyingGlass, X } from '@phosphor-icons/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import {
  FilterForm,
  FilterFormData,
  FilterFormSchema,
} from './_components/FilterForm'
import { Table } from './_components/Table/styles'
import { Container, Main } from './styles'
import { cancelOrder } from '@/api/cancel-order'
import { orderStatusDisplayNames } from '@/utils/select-input-mapper'
import { EmptyListContainer } from '../clothes/styles'
import { Spinner } from '@/components/Spinner'
import { StatusBadge } from './_components/StatusBadge'
import { Pagination } from '@/components/Pagination'
import { refundOrder } from '@/api/refund-order'
import { downloadOrdersReport } from '@/utils/download-orders-report'

export default function Orders() {
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalCount, setTotalCount] = useState<number>()
  const [orders, setOrders] = useState<StoreOrderDTO[]>([])
  const [ordersReport, setOrdersReport] = useState<StoreOrderDTO[]>([])
  const [selectedOrder, setSelectedOrder] = useState<StoreOrderDTO | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  function handleOpenModal(order: StoreOrderDTO) {
    setSelectedOrder(order)
    setIsModalOpen(true)
  }

  function handleCloseModal() {
    setIsModalOpen(false)
    setSelectedOrder(null)
  }

  const router = useRouter()

  const { register, handleSubmit, control, reset } = useForm<FilterFormData>({
    resolver: zodResolver(FilterFormSchema),
  })

  function handleDownloadOrdersReport() {
    if (ordersReport) {
      downloadOrdersReport(ordersReport)
    }
  }

  function handlePaginate(pageIndex: number) {
    setCurrentPage(pageIndex)
  }

  async function handleFetchAllStoreOrders() {
    try {
      const data = await fetchAllStoreOrders()
      setOrdersReport(data)
    } catch (error: any) {
      if (error.response.data.message) {
        toast.error('Erro ao buscar todos os pedidos da loja.', {
          description: error.response.data.message,
        })
        return
      }
      toast.error('Erro ao buscar todos os pedidos da loja.', {
        description:
          'Não foi possível buscar todos os pedidos da loja, tente novamente mais tarde.',
      })
    }
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
          error?.response?.data?.message || 'Tente novamente mais tarde.',
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
          error?.response?.data?.message || 'Tente novamente mais tarde.',
      })
    }
  }

  function formatPrice(priceInCents: number) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(priceInCents / 100)
  }

  async function handleFetchOrdersWithFilter(data: FilterFormData) {
    const response = await fetchOrdersWithFilter({
      page: currentPage,
      clotheName: data.clotheName,
      customerName: data.customerName,
      orderStatus: data.orderStatus,
    })
    setOrders(response.orders)
    setTotalCount(response.meta.totalCount)
  }

  async function handleClearFilters() {
    reset({
      clotheName: '',
      customerName: '',
      orderStatus: 'ALL',
    })
    handleFetchOrdersWithFilter({})
  }

  useEffect(() => {
    setIsLoading(true)
    handleFetchOrdersWithFilter({})
    handleFetchAllStoreOrders()
    setIsLoading(false)
  }, [currentPage])

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
        <Button onClick={handleDownloadOrdersReport}>Baixar Relatório</Button>
        {isLoading ? (
          <div
            style={{
              display: 'flex',
              flex: '1',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Spinner size={30} />
          </div>
        ) : orders.length > 0 ? (
          <Table.Container>
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
                            onClick={() =>
                              alert(`Aprovado pedido #${order.orderStatus}`)
                            }
                            style={{ width: '5px' }}
                          >
                            <MagnifyingGlass size={20} />
                          </Button>
                        </Table.Cell>
                        <Table.Cell>{order.createdAt}</Table.Cell>
                        <Table.Cell>{order.customerName}</Table.Cell>
                        <Table.Cell>{order.clotheName}</Table.Cell>
                        <Table.Cell>
                          <StatusBadge status={order.orderStatus} />
                        </Table.Cell>
                        <Table.Cell style={{ fontWeight: 'bold' }}>
                          {formatPrice(order.priceInCents)}
                        </Table.Cell>
                        <Table.Cell>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <Button
                              variant="primary"
                              size="sm"
                              disabled={
                                order.orderStatus === 'COMPLETED' ||
                                order.orderStatus === 'CANCELED'
                              }
                              onClick={() => handleStatusAction(order)}
                              style={{
                                width: '125px',
                                fontSize: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                              }}
                            >
                              <ArrowRight size={16} />
                              {order.orderStatus === 'PENDING' && 'Aprovar'}
                              {order.orderStatus === 'COMPLETED' && 'Concluído'}
                              {order.orderStatus === 'AWAITING_WITHDRAWAL' &&
                                'Concluir'}
                              {order.orderStatus === 'CANCELED' && 'Cancelado'}
                            </Button>
                            <Button
                              type="button"
                              variant="tertiary"
                              disabled={
                                order.orderStatus === 'COMPLETED' ||
                                order.orderStatus === 'CANCELED'
                              }
                              onClick={() => handleCancelOrder(order.orderId)}
                            >
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
          </Table.Container>
        ) : (
          <EmptyListContainer>
            <Title>Nenhum pedido encontrado!</Title>
            <Text>Os pedidos da sua loja aparecerão aqui.</Text>
          </EmptyListContainer>
        )}
        <Pagination
          onPageChange={handlePaginate}
          pageIndex={currentPage}
          perPage={10}
          totalCount={totalCount || 0}
        />
      </Main>
    </Container>
  )
}
