import { api } from "@/lib/axios";
import { orderStatus } from "@/utils/enums";

export interface StoreOrderDTO {
    orderId: string;
    customerName: string;
    clotheName: number;
    orderStatus: (typeof orderStatus)[number];
    priceInCents: number;
    createdAt: string;
}

export interface FetchOrdersWithFilterResponse {
    orders: StoreOrderDTO[];
    meta: {
        pageIndex: number;
        perPage: number;
        totalCount: number;
    };
}

export interface FetchOrdersWithFilterRequest {
    limit?: number;
    page?: number;
    customerName?: string;
    clotheName?: string;
    storeId?: string;
    orderStatus?: (typeof orderStatus)[number];
    priceInCents?: number;
    createdAt?: string;
}

export async function fetchOrdersWithFilter({
    limit,
    page,
    clotheName,
    customerName,
    orderStatus,
    priceInCents,
    createdAt,
    storeId,
}: FetchOrdersWithFilterRequest): Promise<FetchOrdersWithFilterResponse> {
    const response = await api.post("/orders/stores/filter", {
        limit,
        page,
        clotheName,
        customerName,
        orderStatus,
        priceInCents,
        createdAt,
        storeId,
    });

    return response.data;
}
