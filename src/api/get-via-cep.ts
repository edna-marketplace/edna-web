import { api } from "@/lib/axios";

export async function getViaCep(cep: string) {
    const response = await api.get(`/${cep}/json/`, {
        baseURL: 'https://viacep.com.br/ws'
    });

    return response.data
}