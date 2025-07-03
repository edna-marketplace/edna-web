import { api } from "@/lib/axios";

export async function cancelOrder(orderId: string) {
    try {
        await api.post(`/stores/${orderId}/cancel`);
    } catch (error: any) {
        throw error
    }
}