import { Header } from '@/components/header'
import { Container, Main } from './styles'
import { FilterForm, FilterFormData, FilterFormSchema } from './_components/FilterForm'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { orderStatus } from '@/utils/enums'
import { Card } from '@/components/@ui/Card'

export default function Orders() {
  // const [clothes, setClothes] = useState<OrderStatus[]>([])

  const router = useRouter()

  const { register, handleSubmit, control, reset } = useForm<FilterFormData>({
    resolver: zodResolver(FilterFormSchema)
  })

  async function handleClearFilters() {
    reset({
      clotheName: "",
      customerName: "",
      // orderStatus: "ALL"
    })
  }

  // async function handleFetchClotheOrdersWithFilter(data: FilterFormData) {
  //   const response = await fetchOrdersWithFilter({
  //     name: data.clotheName,
  //     customerName: data.customerName,
  //     orderStatus: data.orderStatus,
  //   })
  //   setOrders(response.clothes)
  // }

  return (
    <Container>
      <Header
        title="Pedidos"
        description="Essa é a área dos seus pedidos, aqui você pode gerenciar todos os pedidos que seus clientes fizeram."
      />
      <Main>
        <form>
          <FilterForm
            register={register}
            control={control}
            handleClearFilters={handleClearFilters}
          />
        </form>
        <Card></Card>
      </Main>
    </Container>
  )
}
