import { styled } from "@edna-ui/react";
import { Card } from "@/components/@ui/Card";
import { Text } from "@/components/@ui/Text";

export const Container = styled(Card, {
  gridColumn: "1 / 2",
  gridRow: "2 / span 2",
  padding: "$4",
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: "$4",
});

export const ChartInfoRow = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
});

export const ChangeIndicator = styled("span", {
  display: "inline-flex",
  alignItems: "center",
  gap: "$1",
  padding: "2px 6px",
  marginLeft: "$6",
  borderRadius: "$xs",
  fontSize: "$xs",

  variants: {
    isNegative: {
      true: {
        backgroundColor: "$red600",
        color: "#A8493B",
      },
      false: {
        backgroundColor: "$blue600",
        color: "#487D79",
      },
    },
  },
});

export const Header = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const CardTitle = styled(Text, {
  fontSize: "$xl",
  color: "$base300",
});

export const PeriodSelector = styled("div", {
  display: "flex",
  gap: "$2",
});

export const PeriodButton = styled("button", {
  borderRadius: "$sm",
  padding: "$1 $3",
  fontSize: "$sm",
  fontWeight: "$bold",
  border: "1px solid $base400",
  cursor: "pointer",
  backgroundColor: "transparent",

  variants: {
    active: {
      true: {
        backgroundColor: "$base100",
        color: "White",
        borderColor: "$base400",
      },
      false: {
        backgroundColor: "$base500",
        color: "$base100",
        borderColor: "$base400",
      },
    },
  },

  defaultVariants: {
    active: false,
  },
});

export const CurrentMonthContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  padding: "0 $2",

  width: "100%",

  marginBottom: "$3",

  "@sm": {
    alignItems: "start",
    flexDirection: "column",
  },
});

export const ComparisonPercentage = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "$1",

  padding: "$1",

  borderRadius: "$xs",

  variants: {
    isNegative: {
      true: {
        background: "$red600",
        color: "#A8493B",
      },
      false: {
        background: "$blue600",
        color: "#487D79",
      },
    },
  },
});

export const CurrentMonthValuePercentage = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "$4",
});

export const Legend = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "$2",
  marginTop: "$2",
  marginRight: "$6",
});

export const Dot = styled("div", {
  width: "8px",
  height: "8px",
  borderRadius: "50%",
  backgroundColor: "#57534e",
});
