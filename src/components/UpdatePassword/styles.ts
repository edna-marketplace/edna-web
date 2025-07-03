import { styled } from "@edna-ui/react";

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
