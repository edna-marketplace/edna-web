import { styled } from "@edna-ui/react";
import * as Dialog from "@radix-ui/react-dialog";
import { Card } from "../@ui/Card";

export const Overlay = styled(Dialog.Overlay, {
  position: "fixed",
  width: "100vw",
  height: "100vh",
  inset: 0,
  background: "rgba(0, 0, 0, 0.75)",
});

export const Content = styled(Dialog.Content, {
  minWidth: "32rem",
  borderRadius: "6px",
  padding: "$6",
  background: "$base700",

  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});

export const Header = styled("div", {
  display: "flex",
  justifyContent: "space-between",
});

export const CustomerInfoContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$5",

  padding: "$6 $4 $2 $4",

  "& > div": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    padding: "0 $2 $5 $2",

    "&:not(:last-child)": {
      borderBottom: "1px solid $base500",
    },
  },
});

export const ClotheInfoContainer = styled(Card, {
  display: "flex",
  flexWrap: "wrap",

  alignItems: "end",
  justifyContent: "space-between",
  margin: "0 $4",
});

export const ClotheDetailsContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$4",
});

export const SizeGenderBrandContainer = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: "$6",
});
