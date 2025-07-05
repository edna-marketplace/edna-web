import {
  ClotheSummary,
  fetchClothesWithFilter,
} from "@/api/fetch-clothes-with-filter";
import { Button } from "@/components/@ui/Button";
import { Text } from "@/components/@ui/Text";
import { Title } from "@/components/@ui/Title";
import { Header } from "@/components/header";
import { brands, categories, sizes } from "@/utils/enums";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "@phosphor-icons/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  ClothesContainer,
  Container,
  EmptyListContainer,
  Main,
  NewClotheContainer,
} from "../../styles/clothes/styles";
import { Pagination } from "@/components/Pagination";
import { Spinner } from "@/components/Spinner";
import { FilterForm } from "@/components/FilterForm";
import { ClotheItem } from "@/components/ClotheItem";

export const FilterFormSchema = z.object({
  name: z.string().optional(),
  brand: z.enum(brands).optional(),
  category: z.enum(categories).optional(),
  size: z.enum(sizes).optional(),
});

export type FilterFormData = z.infer<typeof FilterFormSchema>;

export default function Clothes() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>();
  const [clothes, setClothes] = useState<ClotheSummary[]>([]);

  const router = useRouter();

  const { register, handleSubmit, control, reset } = useForm<FilterFormData>({
    resolver: zodResolver(FilterFormSchema),
  });

  function handleClotheDetails(clotheId: string) {
    router.push(`/clothes/${clotheId}`);
  }

  function handleNewClothe() {
    router.push("/clothes/new");
  }

  function handlePaginate(pageIndex: number) {
    setCurrentPage(pageIndex);
  }

  async function handleFetchClothesWithFilter(data: FilterFormData) {
    const response = await fetchClothesWithFilter({
      page: currentPage,
      name: data.name,
      category: data.category,
      brand: data.brand,
      size: data.size,
    });
    setClothes(response.clothes);
    setTotalCount(response.meta.totalCount);
  }

  async function handleClearFilters() {
    reset({
      name: "",
      brand: "ALL",
      category: "ALL",
      size: "ALL",
    });
    handleFetchClothesWithFilter({});
  }

  useEffect(() => {
    setIsLoading(true);
    handleFetchClothesWithFilter({});
    setIsLoading(false);
  }, [currentPage]);

  return (
    <Container>
      <Header
        title="Peças"
        description="Essa é a área das suas peças, aqui você pode cadastrar novas roupas, editá-las e excluí-las."
      />

      <Main>
        <form onSubmit={handleSubmit(handleFetchClothesWithFilter)}>
          <FilterForm
            register={register}
            control={control}
            handleClearFilters={handleClearFilters}
          />
          <NewClotheContainer>
            <Button
              type="button"
              size="sm"
              onClick={handleNewClothe}
              variant="primary"
            >
              <Plus size={16} />
              Nova peça
            </Button>
          </NewClotheContainer>
        </form>

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
        ) : clothes.length > 0 ? (
          <ClothesContainer>
            {clothes.map((clothe) => (
              <ClotheItem
                clothe={clothe}
                onClick={() => handleClotheDetails(clothe.id)}
              />
            ))}
          </ClothesContainer>
        ) : (
          <EmptyListContainer>
            <Title>Nenhuma peça por aqui!</Title>
            <Text>Adicione uma nova peça clicando no botão acima</Text>
          </EmptyListContainer>
        )}
        {clothes.length !== 0 && (
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
