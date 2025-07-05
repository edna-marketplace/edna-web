import { Card } from "@/components/@ui/Card";
import { styled } from "@edna-ui/react";

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",

  marginLeft: "230px",
  width: "100%",

  "@xl": {
    marginLeft: "200px",
  },

  "@md": {
    marginLeft: "0",
  },
});

export const NewClotheContainer = styled("div", {
  display: "flex",
  justifyContent: "flex-end",
  marginTop: "$4",
  width: "100%",
});

export const Main = styled("main", {
  display: "flex",
  flexDirection: "column",
  gap: "$8",

  padding: "$8 $40",

  "@xl": {
    padding: "$8 $12",
  },
  "@md": {
    padding: "$8 $4 $8 $12",
  },
});

export const ClothesContainer = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(6, 1fr)",
  placeItems: "center",
  width: "100%",

  "@xl": {
    gridTemplateColumns: "repeat(5, 1fr)",
  },
  "@lg": {
    gridTemplateColumns: "repeat(4, 1fr)",
  },
  "@md": {
    gridTemplateColumns: "repeat(3, 1fr)",
  },
  "@sm": {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
});

export const EmptyListContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "$1",

  marginTop: "$10",

  color: "$base400",
});
