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
  borderRadius: "$lg",
  height: "fit-content",
  display: "flex",
  flexDirection: "column",
  gap: "$4",

  "@md": {
    paddingLeft: "$0",
    marginTop: "$6",
  },
});

export const Field = styled("div", {
  display: "flex",
  width: "100%",
  flexDirection: "column",

  "& > div": {
    display: "flex",
    alignItems: "center",
    gap: "$1",
  },
});

export const Section = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$3",

  borderBottom: "1px solid $base500",
  paddingBottom: "$5",
  marginBottom: "$5",

  "& > div": {
    display: "flex",
    alignItems: "center",
    gap: "$4",
    width: "100%",
  },

  form: {
    display: "flex",
    flexDirection: "column",
  },
});
