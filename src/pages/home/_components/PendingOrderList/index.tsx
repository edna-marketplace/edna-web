import { Container, OrderItem } from "./styles";
import { Text } from "@/components/@ui/Text";

export interface PendingOrderListProps {
  orders: { id: string; clotheName: string; createdAt: string }[];
}

export function PendingOrderList({ orders }: PendingOrderListProps) {
  const hasOrders = orders.length > 0;

  return (
    <Container>
      <Text size="md" css={{ color: "$base300" }}>
        Pedidos pendentes
      </Text>

      {hasOrders ? (
        orders.map((order) => (
          <OrderItem key={order.id}>
            <div>
              <Text
                size="sm"
                css={{
                  maxWidth: "170px",
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
            height: 220,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--colors-base400)",
            fontWeight: 500,
          }}
        >
          <Text size="sm">Sem pedidos pendentes</Text>
        </div>
      )}
    </Container>
  );
}
