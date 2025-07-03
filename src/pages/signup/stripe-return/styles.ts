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
