import { styled } from "@edna-ui/react";

export const Container = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  "@sm": {
    flexDirection: "column",
    justifyContent: "start",
    gap: "$3",
  },
});

export const Content = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "12px",
});
