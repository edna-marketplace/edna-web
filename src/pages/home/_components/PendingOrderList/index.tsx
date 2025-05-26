import {
    Container,
    OrderItem,
} from './styles'

import { Text } from '@/components/@ui/Text'

export interface PendingOrderListProps {
    orders: { id: string; name: string; date: string }[]
}

export function PendingOrderList({ orders }: PendingOrderListProps) {
    return (
        <Container>
            <Text size="md" css={{ color: '$base300' }}>
                Pedidos pendentes
            </Text>

            {orders.map((order) => (
                <OrderItem key={order.id}>
                    <div>
                        <Text
                            size="sm"
                            css={{
                                maxWidth: '170px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                color: '$base100',
                                fontWeight: 'bold',
                            }}
                        >
                            {order.name}
                        </Text>

                        <Text
                            size="sm"
                            css={{
                                fontWeight: '$medium',
                                color: '$mutedForeground',
                            }}
                        >
                            {order.date}
                        </Text>
                    </div>
                </OrderItem>
            ))}
        </Container>
    )
}
