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

export const Main = styled("main", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  padding: "$10 $20",

  "@xl": {
    padding: "$10 $12",
  },

  "@md": {
    gridTemplateColumns: "1fr",
    padding: "64px $4 $8 $12",
  },
});

export const RightColumn = styled("aside", {
  backgroundColor: "$neutral100",
  paddingLeft: "$6",
  paddingRight: "$12",
  borderRadius: "$lg",
  height: "fit-content",
  boxShadow: "0 0 0 1px $colors$border",
  display: "flex",
  flexDirection: "column",
  gap: "$4",

  "@md": {
    paddingLeft: "$0",
    paddingRight: "$16",
    marginTop: "$6",
  },
});

export const EditInfoButton = styled("button", {
  all: "unset",

  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",

  width: "100%",
  padding: "$6",

  background: "$base600",
  border: "1px solid $base500",
  borderRadius: "$md",

  "& > div": {
    display: "flex",
    alignItems: "center",
    gap: "$4",
  },

  transition: "border-color .2s",

  "&:hover": {
    borderColor: "$base400",
    cursor: "pointer",
  },
});
