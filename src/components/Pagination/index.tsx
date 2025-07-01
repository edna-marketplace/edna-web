import {
  CaretDoubleLeft,
  CaretDoubleRight,
  CaretLeft,
  CaretRight,
} from "@phosphor-icons/react";
import { Button } from "../@ui/Button";
import { Text } from "../@ui/Text";

export interface PaginationProps {
  pageIndex: number;
  totalCount: number;
  perPage: number;
  onPageChange: (pageIndex: number) => Promise<void> | void;
}

export function Pagination({
  pageIndex,
  perPage,
  totalCount,
  onPageChange,
}: PaginationProps) {
  const pages = Math.ceil(totalCount / perPage) || 1;

  return (
    <div
      className="flex items-center justify-between"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Text size="xs">Total de {totalCount} item(s)</Text>

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <Text size="xs">
          Página {pageIndex} de {pages}
        </Text>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <Button
            variant="secondary"
            size="sm"
            style={{ width: "fit-content" }}
            onClick={() => onPageChange(1)}
            disabled={pageIndex === 1}
          >
            <CaretDoubleLeft />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            style={{ width: "fit-content" }}
            onClick={() => onPageChange(pageIndex - 1)}
            disabled={pageIndex === 1}
          >
            <CaretLeft />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            style={{ width: "fit-content" }}
            onClick={() => onPageChange(pageIndex + 1)}
            disabled={pages <= pageIndex}
          >
            <CaretRight />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            style={{ width: "fit-content" }}
            onClick={() => onPageChange(pages)}
            disabled={pages <= pageIndex}
          >
            <CaretDoubleRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
