import { Text } from "@/components/@ui/Text";
import { ComparisonPercentage, InfoContainer } from "./styles";
import { Title } from "@edna-ui/react";
import { CaretDown, CaretUp, Minus } from "@phosphor-icons/react";
import { Spinner } from "@/components/Spinner";

export interface InfoCardProps {
  title: string;
  value: number;
  percentage: number;
  type: "default" | "currency";
  isLoading: boolean;
}

export function InfoCard({
  title,
  value,
  percentage,
  type,
  isLoading,
}: InfoCardProps) {
  const isNegative = percentage < 0;

  const safeValue = isNaN(value) ? 0 : value;
  const safePercentage = isNaN(percentage) ? 0 : percentage;

  return (
    <InfoContainer>
      <Text size="md">{title}</Text>
      <Title>
        {isLoading ? (
          <Spinner />
        ) : type === "currency" ? (
          (safeValue / 100).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })
        ) : (
          safeValue
        )}
      </Title>
      <div>
        <Text size="xs" style={{ fontWeight: "normal" }}>
          Desde semana passada
        </Text>
        <ComparisonPercentage isNegative={isNegative}>
          <Text size="xs" weight="bold">
            {isLoading ? <Spinner /> : `${Math.abs(percentage)}%`}
          </Text>
          {percentage !== 0 ? (
            isNegative ? (
              <CaretDown size={14} weight="bold" />
            ) : (
              <CaretUp size={14} weight="bold" />
            )
          ) : (
            <Minus size={12} weight="bold" />
          )}
        </ComparisonPercentage>
      </div>
    </InfoContainer>
  );
}
