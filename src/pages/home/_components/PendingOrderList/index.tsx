export interface PendingOrderListProps {
    orders: { id: string, name: string, date: string}[]
}

export function PendingOrderList({ orders }: PendingOrderListProps) {
    return (
        <div>
            {orders.map(order => (
                <div>{order.name}, {order.date}</div>
            ))}
        </div>
    )
}