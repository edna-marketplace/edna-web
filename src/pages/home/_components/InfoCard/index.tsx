import { Text } from "@/components/@ui/Text";
import { ComparisonPercentage, InfoContainer } from "./styles";
import { Title } from "@edna-ui/react";
import { CaretDown, CaretUp } from "@phosphor-icons/react";

export interface InfoCardProps {
  title: string;
  value: number;
  percentage: number;
  type: "default" | "currency";
}

export function InfoCard({ title, value, percentage, type }: InfoCardProps) {
  const isNegative = percentage < 0;

  const safeValue = isNaN(value) ? 0 : value;
  const safePercentage = isNaN(percentage) ? 0 : percentage;

  // Corrige para 0% se o valor base for 0
  const formattedPercentage = safeValue === 0 ? 0 : +safePercentage.toFixed(1);

  return (
    <InfoContainer>
      <Text size="md">{title}</Text>
      <Title>
        {type === "currency"
          ? safeValue.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })
          : safeValue}
      </Title>
      <div>
        <Text size="xs">Desde semana passada</Text>
        <ComparisonPercentage isNegative={isNegative}>
          <Text size="xs" weight="bold">
            {Math.abs(formattedPercentage)}%
          </Text>
          {formattedPercentage !== 0 &&
            (isNegative ? (
              <CaretDown size={14} weight="bold" />
            ) : (
              <CaretUp size={14} weight="bold" />
            ))}
        </ComparisonPercentage>
      </div>
    </InfoContainer>
  );
}
