import { awaitWithdrawalOrder } from "@/api/await-withdrawal-order";
import { cancelOrder } from "@/api/cancel-order";
import { completeOrder } from "@/api/complete-order";
import { fetchAllStoreOrders } from "@/api/fetch-all-store-orders";
import * as Dialog from "@radix-ui/react-dialog";
import {
  fetchOrdersWithFilter,
  StoreOrderDTO,
} from "@/api/fetch-orders-with-filter";
import { refundOrder } from "@/api/refund-order";
import { Button } from "@/components/@ui/Button";
import { Card } from "@/components/@ui/Card";
import { Text } from "@/components/@ui/Text";
import { Title } from "@/components/@ui/Title";
import { Header } from "@/components/header";
import { Pagination } from "@/components/Pagination";
import { Spinner } from "@/components/Spinner";
import { downloadOrdersReport } from "@/utils/download-orders-report";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  DownloadSimple,
  MagnifyingGlass,
  X,
} from "@phosphor-icons/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { EmptyListContainer } from "@/styles/clothes/styles";
import {
  FilterForm,
  FilterFormData,
  FilterFormSchema,
} from "../../components/OrdersFilterForm";
import { StatusBadge } from "../../components/StatusBadge";
import { Table } from "../../components/Table/styles";
import { Container, Main } from "@/styles/orders/styles";
import { OrderDetailsModal } from "@/components/OrderDetailsModal";

export default function Orders() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>();
  const [orders, setOrders] = useState<StoreOrderDTO[]>([]);

  const { register, handleSubmit, control, reset } = useForm<FilterFormData>({
    resolver: zodResolver(FilterFormSchema),
  });

  async function handleDownloadOrdersReport() {
    const ordersReport = await handleFetchAllStoreOrders();

    if (ordersReport) {
      downloadOrdersReport(ordersReport);
    }
  }

  function handlePaginate(pageIndex: number) {
    setCurrentPage(pageIndex);
  }

  async function handleFetchAllStoreOrders() {
    try {
      const data = await fetchAllStoreOrders();

      return data;
    } catch (error: any) {
      if (error.response.data.message) {
        toast.error("Erro ao buscar todos os pedidos da loja.", {
          description: error.response.data.message,
        });
        return;
      }
      toast.error("Erro ao buscar todos os pedidos da loja.", {
        description:
          "Não foi possível buscar todos os pedidos da loja, tente novamente mais tarde.",
      });
    }
  }

  async function handleStatusAction(order: StoreOrderDTO) {
    try {
      if (order.orderStatus === "PENDING") {
        await awaitWithdrawalOrder(order.orderId);
        toast.success("Pedido marcado como aguardando retirada.");
      } else if (order.orderStatus === "AWAITING_WITHDRAWAL") {
        const result = await Swal.fire({
          title: "Concluir pedido",
          text: "Ao concluir o pedido, você não poderá mais cancelá-lo. Você realmente deseja concluir esse pedido?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "var(--colors-base100)",
          confirmButtonText: "Sim, concluir",
          cancelButtonText: "Não",
        });

        if (!result.isConfirmed) return;

        await completeOrder(order.orderId);
        toast.success("Pedido marcado como concluído.");
      } else {
        toast.info("Esse pedido não permite ações.");
        return;
      }
      await handleFetchOrdersWithFilter({});
    } catch (error: any) {
      toast.error("Erro ao processar o pedido.", {
        description:
          error?.response?.data?.message || "Tente novamente mais tarde.",
      });
    }
  }

  async function handleCancelOrder(orderId: string, paymentIntentId: string) {
    const result = await Swal.fire({
      title: "Cancelar pedido",
      text: "Ao cancelar o pedido, o valor será totalmente reembolsado ao cliente. Você realmente deseja cancelar esse pedido?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--colors-base100)",
      confirmButtonText: "Sim, cancelar",
      cancelButtonText: "Não, manter pedido",
    });

    if (!result.isConfirmed) return;

    try {
      await refundOrder(paymentIntentId);
      await cancelOrder(orderId);

      toast.success("Pedido cancelado com sucesso!");

      await handleFetchOrdersWithFilter({});
    } catch (error: any) {
      if (error.response.data.message) {
        toast.error("Erro ao cancelar pedido!", {
          description: error.response.data.message,
        });
        return;
      }
      toast.error("Erro ao cancelar pedido!", {
        description:
          "Não foi possível cancelar o pedido, tente novamente mais tarde.",
      });
    }
  }

  function formatPrice(priceInCents: number) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(priceInCents / 100);
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
      customerName: "",
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

        <div
          style={{ position: "relative", height: "20px", marginTop: "-32px" }}
        >
          <Button
            style={{ position: "absolute", right: 0, top: "40%" }}
            variant="secondary"
            size="sm"
            onClick={handleDownloadOrdersReport}
          >
            <DownloadSimple />
            Exportar para PDF
          </Button>
        </div>

        {isLoading ? (
          <div
            style={{
              display: "flex",
              flex: "1",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Spinner size={30} />
          </div>
        ) : orders.length > 0 ? (
          <Table.Container>
            <Card>
              <div style={{ overflowX: "auto" }}>
                <Table.Root>
                  <Table.Row>
                    <Table.Head style={{ padding: "12px 8px" }}></Table.Head>
                    <Table.Head>Data</Table.Head>
                    <Table.Head style={{ width: "200px" }}>Cliente</Table.Head>
                    <Table.Head style={{ width: "200px" }}>Peça</Table.Head>
                    <Table.Head>Status</Table.Head>
                    <Table.Head>Valor</Table.Head>
                  </Table.Row>
                  <Table.Body>
                    {orders.map((order) => (
                      <Table.Row key={order.orderId}>
                        <Table.Cell>
                          <Dialog.Root>
                            <Dialog.Trigger asChild>
                              <Table.DetailsButton>
                                <MagnifyingGlass size={15} weight="bold" />
                              </Table.DetailsButton>
                            </Dialog.Trigger>

                            <OrderDetailsModal orderId={order.orderId} />
                          </Dialog.Root>
                        </Table.Cell>
                        <Table.Cell>
                          {new Date(order.createdAt).toLocaleDateString(
                            "pt-br"
                          )}
                        </Table.Cell>
                        <Table.Cell>{order.customerName}</Table.Cell>
                        <Table.Cell>{order.clotheName}</Table.Cell>
                        <Table.Cell>
                          <StatusBadge status={order.orderStatus} />
                        </Table.Cell>
                        <Table.Cell
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            fontWeight: "bold",
                            paddingTop: "24px",
                          }}
                        >
                          <span>{formatPrice(order.priceInCents)}</span>
                          <span
                            style={{
                              fontWeight: "normal",
                              fontSize: "12px",
                              marginTop: "6px",
                            }}
                          >
                            ({formatPrice(order.priceInCents * 0.86)})
                          </span>
                        </Table.Cell>
                        <Table.Cell>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center", // Alinha verticalmente
                              justifyContent: "flex-start",
                              gap: "8px",
                              height: "100%", // Garante que o alinhamento vertical funcione
                            }}
                          >
                            <Button
                              variant="primary"
                              size="sm"
                              disabled={
                                order.orderStatus === "COMPLETED" ||
                                order.orderStatus === "CANCELED"
                              }
                              onClick={() => handleStatusAction(order)}
                              style={{
                                width: "100px",
                                fontSize: "12px",
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                              }}
                            >
                              <ArrowRight size={16} />
                              {order.orderStatus === "PENDING" && "Aprovar"}
                              {order.orderStatus === "COMPLETED" && "Concluído"}
                              {order.orderStatus === "AWAITING_WITHDRAWAL" &&
                                "Concluir"}
                              {order.orderStatus === "CANCELED" && "Cancelado"}
                            </Button>
                            <Button
                              type="button"
                              variant="tertiary"
                              disabled={
                                order.orderStatus === "COMPLETED" ||
                                order.orderStatus === "CANCELED"
                              }
                              onClick={() =>
                                handleCancelOrder(
                                  order.orderId,
                                  order.paymentIntentId
                                )
                              }
                              style={{
                                width: "110px",
                                fontSize: "12px",
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                              }}
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
        {orders.length !== 0 && (
          <Pagination
            onPageChange={handlePaginate}
            pageIndex={currentPage}
            perPage={10}
            totalCount={totalCount ? totalCount : 0}
          />
        )}
      </Main>
    </Container>
  );
}
