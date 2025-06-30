import { Card } from "@/components/@ui/Card";
import {
  BannerImage,
  BannerPlaceholder,
  LeftColumn,
  ProfileImage,
  ProfileImagePlaceholder,
  RatingContainer,
  ScheduleContainer,
  Section,
} from "./styles";
import { Text } from "@/components/@ui/Text";
import { Title } from "@/components/@ui/Title";
import { MapPin, Star, Storefront } from "@phosphor-icons/react";
import { weekDayMapper } from "@/utils/weekDayMapper";
import { convertMinutesToTimeString } from "@/utils/convert-minutes-to-time-string";
import { useEffect, useState } from "react";
import {
  getAuthenticatedStore,
  GetAuthenticatedStoreResponse,
} from "@/api/get-authenticated-store";
import { Spinner } from "@/components/Spinner";
import { toTargetCustomerDisplay } from "@/utils/to-target-customer-display";
import { formatPhoneNumber } from "@/utils/format-phone-number";
import { formatCNPJ } from "@/utils/format-cnpj";
import { SpecialTitle } from "@/components/@ui/SpecialTitle";
import { useIsMobile } from "@/hooks/use-is-mobile";

export function ProfilePreview() {
  const [isLoading, setIsLoading] = useState(false);
  const [store, setStore] = useState<GetAuthenticatedStoreResponse | null>(
    null
  );

  const isMobile = useIsMobile();

  async function getStoreInfo() {
    const data = await getAuthenticatedStore();

    setStore(data);
  }

  useEffect(() => {
    setIsLoading(true);
    getStoreInfo();
    setIsLoading(false);
  }, []);

  if (!store) {
    return <Spinner />;
  }

  return (
    <LeftColumn>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            flex: "1",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spinner size={30} />
        </div>
      ) : (
        <>
          <Card
            css={{
              width: "100%",
              backgroundColor: "#E3DBBD",
            }}
          >
            <Text size="sm" css={{ textAlign: "center" }}>
              ESTA É UMA <strong>PRÉ-VISUALIZAÇÃO</strong> DE COMO OS{" "}
              <strong>CLIENTES</strong> VERÃO O{" "}
              <strong>PERFIL DO BRECHÓ</strong>
            </Text>
          </Card>

          <div>
            {store.bannerImageUrl ? (
              <BannerImage
                src={store.bannerImageUrl}
                alt=""
                width={650}
                height={212}
              />
            ) : (
              <BannerPlaceholder>
                <SpecialTitle style={{ color: "#FFF" }}>
                  {store.name}
                </SpecialTitle>
              </BannerPlaceholder>
            )}

            {store.profileImageUrl ? (
              <ProfileImage
                src={store.profileImageUrl}
                alt=""
                width={160}
                height={160}
              />
            ) : (
              <ProfileImagePlaceholder>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "95%",
                    height: "95%",
                    background: "var(--colors-base700)",
                    borderRadius: "999px",
                  }}
                >
                  <Storefront
                    size={isMobile ? 40 : 50}
                    weight="bold"
                    color="var(--colors-base400)"
                  />
                </div>
              </ProfileImagePlaceholder>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <Title>{store?.name}</Title>

            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Text size="md" weight="bold" css={{ color: "#A19B87" }}>
                {store && toTargetCustomerDisplay(store.targetCustomer)}
              </Text>

              <span style={{ color: "var(--colors-base500)" }}>●</span>

              <RatingContainer>
                {store?.avgRating ? (
                  <>
                    <Star size={16} weight="fill" color="#F1B04E" />
                    <Text
                      size="sm"
                      weight="bold"
                      style={{ color: "var(--colors-orange400)" }}
                    >
                      {Number(store.avgRating).toFixed(1)}
                    </Text>
                  </>
                ) : (
                  <Text size="sm">Sem avaliações no momento</Text>
                )}
              </RatingContainer>
            </div>
          </div>

          <div
            style={{
              height: "1px",
              backgroundColor: "var(--colors-base500)",
              width: "100%",
            }}
          />

          <Section>
            <Text size="lg" weight="bold" css={{ marginBottom: "$2" }}>
              Descrição
            </Text>
            <Text size="md" style={{ color: "var(--colors-base300)" }}>
              {store?.description ? store.description : "Sem descrição."}
            </Text>
          </Section>

          <Section>
            <Text size="lg" weight="bold" css={{ marginBottom: "$2" }}>
              Horário de atendimento
            </Text>

            {store &&
              store.schedule.map((day) => (
                <ScheduleContainer key={day.id}>
                  <Text size="md" style={{ color: "var(--colors-base300)" }}>
                    {/* @ts-ignore */}
                    {weekDayMapper[day.dayOfWeek]}
                  </Text>
                  {day.enabled ? (
                    <Text
                      size="md"
                      weight="bold"
                      style={{ color: "var(--colors-base300)" }}
                    >
                      {convertMinutesToTimeString(day.openingTimeInMinutes)} -{" "}
                      {convertMinutesToTimeString(day.closingTimeInMinutes)}
                    </Text>
                  ) : (
                    <Text
                      size="md"
                      weight="bold"
                      style={{ color: "var(--colors-base300)" }}
                    >
                      FECHADO
                    </Text>
                  )}
                </ScheduleContainer>
              ))}
          </Section>

          <Section>
            <Text size="lg" weight="bold" css={{ marginBottom: "$2" }}>
              Endereço
            </Text>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <MapPin size={32} weight="fill" color="var(--colors-base200)" />
              <Text size="md" css={{ color: "var(--colors-base300)" }}>
                {store?.address.street}, {store?.address.number}
                <br />
                {store?.address.neighborhood}, {store?.address.city}
                <br />
                <strong>CEP:</strong> {store?.address.cep.slice(0, 5)}-
                {store?.address.cep.slice(5, 8)}
              </Text>
            </div>
          </Section>

          <Section>
            <Text size="lg" weight="bold" css={{ marginBottom: "$2" }}>
              Outras informações
            </Text>
            <Text size="md" css={{ color: "#827E6D" }}>
              <strong>Contato:</strong> {formatPhoneNumber(store!.phone)}
              <br />
              <strong>CNPJ:</strong> {formatCNPJ(store!.cnpj)}
            </Text>
          </Section>
        </>
      )}
    </LeftColumn>
  );
}
