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
  const formattedPercentage = isNaN(percentage) ? 0 : +percentage.toFixed(1);

  return (
    <InfoContainer>
      <Text size="md">{title}</Text>
      <Title>
        {type === "currency"
          ? value.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })
          : value}
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
