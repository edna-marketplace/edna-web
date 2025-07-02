import { styled } from "@edna-ui/react";
import Image from "next/image";

export const Container = styled("div", {
  position: "relative",
});

export const ClotheImage = styled(Image, {
  objectFit: "cover",
  borderRadius: "$sm",
});

export const RemoveButton = styled("button", {
  all: "unset",
  cursor: "pointer",

  position: "absolute",
  top: "-$4",
  right: "-$4",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  padding: "$1",

  height: "$5",
  width: "$5",

  background: "$base600",

  border: "3px solid $base500",
  borderRadius: "$full",

  color: "$base100",
});
