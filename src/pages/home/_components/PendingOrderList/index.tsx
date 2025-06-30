import { PendingOrder } from "@/api/fetch-pending-orders-metrics";
import { Container, OrderItem } from "./styles";
import { Text } from "@/components/@ui/Text";
import { useRouter } from "next/router";
import { Spinner } from "@/components/Spinner";

export interface PendingOrderListProps {
  orders: PendingOrder[];
  isLoading: boolean;
}

export function PendingOrderList({ orders, isLoading }: PendingOrderListProps) {
  const router = useRouter();

  const hasOrders = orders.length > 0;

  return (
    <Container
      style={{
        height: "100%",
      }}
    >
      <Text size="md" css={{ color: "$base300" }}>
        Pedidos pendentes
      </Text>

      {isLoading ? (
        <div
          style={{
            flex: "1",
            display: "flex", // Add this line
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Spinner />
        </div>
      ) : hasOrders ? (
        orders.map((order) => (
          <OrderItem
            onClick={() => router.push("/orders")}
            key={order.clotheName}
          >
            <div>
              <Text
                size="sm"
                css={{
                  maxWidth: "130px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  color: "$base100",
                  fontWeight: "bold",
                }}
              >
                {order.clotheName}
              </Text>

              <Text
                size="sm"
                css={{
                  fontWeight: "$medium",
                  color: "$mutedForeground",
                }}
              >
                {new Date(order.createdAt).toLocaleDateString("pt-BR")}
              </Text>
            </div>
          </OrderItem>
        ))
      ) : (
        <div
          style={{
            width: "100%",
            display: "flex",
            flex: "1",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--colors-base400)",
          }}
        >
          <Text size="sm">Sem pedidos pendentes</Text>
        </div>
      )}
    </Container>
  );
}
