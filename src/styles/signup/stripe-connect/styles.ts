import { Card } from "@/components/@ui/Card";
import { Text } from "@/components/@ui/Text";
import { styled, Title } from "@edna-ui/react";

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

export const FormContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  gap: "$4",

  width: "450px",

  "@lg": {
    width: "375px",
  },

  // "@md": {
  //   width: "375px",
  // },

  "@sm": {
    width: "230px",
  },
});

export const FormTitle = styled(Title, {
  alignSelf: "flex-start",
  marginBottom: "$4",
});

export const WhatsStripeContainer = styled(Card, {
  background: "$base500",

  [`& > ${Text}`]: {
    color: "$base200",
  },
});

export const ButtonContainer = styled(Card, {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",

  padding: "$4",
  background: "$base700",
  width: "100%",

  [`& > ${Text}`]: {
    width: "fit-content",
  },

  "@sm": {
    flexDirection: "column",
    gap: "$4",
  },
});

export const AlreadyHaveAccountContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "end",
  marginTop: "$8",
});
