import { Card } from "@/components/@ui/Card";
import { Text } from "@/components/@ui/Text";
import { styled } from "@edna-ui/react";

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  padding: "$12",
  gap: "$8",
});

export const Heading = styled("div", {
  display: "flex",
  flexDirection: "column",
  textAlign: "center",

  [`& > ${Text}`]: {
    color: "$base300",
  },
});

export const TwoFactorOTPForm = styled("form", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "$3",

  [`& > ${Text}`]: {
    color: "$base300",
  },

  width: "350px",

  "@sm": {
    width: "300px",
  },
});

export const WarningContainer = styled(Card, {
  background: "$base500",
  padding: "$5",

  [`& > ${Text}`]: {
    color: "$base200",
  },
});

export const InputContainer = styled("div", {
  display: "flex",
  flexDirection: "column",

  width: "100%",
});

export const ButtonContainer = styled("div", {
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
});
