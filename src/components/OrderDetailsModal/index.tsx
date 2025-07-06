import * as Dialog from "@radix-ui/react-dialog";
import { X } from "phosphor-react";
import { Button } from "../@ui/Button";
import { Text } from "../@ui/Text";
import { StatusBadge } from "../StatusBadge";
import {
  ClotheDetailsContainer,
  ClotheInfoContainer,
  Content,
  CustomerInfoContainer,
  Header,
  Overlay,
  SizeGenderBrandContainer,
} from "./styles";
import { useEffect, useState } from "react";
import { getOrderById, GetOrderByIdResponse } from "@/api/get-order-by-id";
import { Spinner } from "../Spinner";
import { formatPhoneNumber } from "@/utils/format-phone-number";
import {
  brandDisplayNames,
  genderDisplayNames,
  sizeDisplayNames,
} from "@/utils/select-input-mapper";
import { brands, sizes } from "@/utils/enums";

interface OrderDetailsModalProps {
  orderId: string;
}

export function OrderDetailsModal({ orderId }: OrderDetailsModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState<GetOrderByIdResponse>();

  async function getOrderDetails() {
    const data = await getOrderById(orderId);

    setOrderDetails(data);
  }

  useEffect(() => {
    setIsLoading(true);
    getOrderDetails();
    setIsLoading(false);
  }, [orderId]);

  function getBrandDisplayName(
    brand: (typeof brands)[number],
    brandOther: string
  ) {
    let brandName =
      brand === "OTHER"
        ? brandOther || brandDisplayNames.OTHER
        : brandDisplayNames[brand];

    if (brandName.length > 10) {
      return `${brandName.slice(0, 7)}...`;
    }

    return brandName;
  }

  function getSizeDisplayName(size: (typeof sizes)[number], sizeOther: string) {
    let sizeName =
      size === "OTHER"
        ? sizeOther || sizeDisplayNames.OTHER
        : sizeDisplayNames[size];

    if (size.length > 8) {
      return `${size.slice(0, 7)}...`;
    }

    return sizeName;
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        {isLoading ? (
          <div
            style={{
              display: "flex",
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Spinner size={30} />
          </div>
        ) : orderDetails ? (
          <>
            <Header>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Dialog.Title>{orderDetails.clotheName}</Dialog.Title>

                <Text css={{ color: "$base400" }}>
                  {new Date(orderDetails.createdAt).toLocaleDateString("pt-br")}
                </Text>
              </div>

              <Dialog.Close asChild>
                <Button size="sm" variant="tertiary">
                  <X />
                </Button>
              </Dialog.Close>
            </Header>

            <CustomerInfoContainer>
              <div>
                <Text css={{ color: "$base400" }}>Status</Text>
                <StatusBadge status={orderDetails.orderStatus} />
              </div>

              <div>
                <Text css={{ color: "$base400" }}>Cliente</Text>
                <Text>{orderDetails.customerName}</Text>
              </div>

              <div>
                <Text css={{ color: "$base400" }}>Telefone</Text>
                <Text>{formatPhoneNumber(orderDetails.customerPhone)}</Text>
              </div>

              <div>
                <Text css={{ color: "$base400" }}>E-mail</Text>
                <Text>{orderDetails.customerEmail}</Text>
              </div>
            </CustomerInfoContainer>

            <ClotheInfoContainer>
              <ClotheDetailsContainer>
                <div>
                  <Text type="label">Nome</Text>
                  <Text>{orderDetails.clotheName}</Text>
                </div>
                <SizeGenderBrandContainer>
                  <div>
                    <Text type="label">Tamanho</Text>
                    <Text>
                      {getSizeDisplayName(
                        orderDetails.clotheSize,
                        orderDetails.clotheSizeOther
                      )}
                    </Text>
                  </div>
                  <div>
                    <Text type="label">Gênero</Text>
                    <Text>{genderDisplayNames[orderDetails.clotheGender]}</Text>
                  </div>
                  <div>
                    <Text type="label">Marca</Text>
                    <Text
                      style={{
                        wordBreak: "break-all",
                        display: "inline-block",
                      }}
                    >
                      {getBrandDisplayName(
                        orderDetails.clotheBrand,
                        orderDetails.clotheBrandOther
                      )}
                    </Text>
                  </div>
                </SizeGenderBrandContainer>
              </ClotheDetailsContainer>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "end",
                }}
              >
                <Text type="label">Valor</Text>
                <Text css={{ fontWeight: "$bold" }}>
                  {(orderDetails.clothePriceInCents / 100).toLocaleString(
                    "pt-br",
                    {
                      style: "currency",
                      currency: "BRL",
                    }
                  )}
                </Text>
              </div>
            </ClotheInfoContainer>
          </>
        ) : (
          <Text>Peça não encontrada</Text>
        )}
      </Content>
    </Dialog.Portal>
  );
}
