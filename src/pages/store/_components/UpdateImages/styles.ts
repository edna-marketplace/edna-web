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

export const ErrorMessage = styled("p", {
  color: "red",
  fontSize: "$xs",
  height: "0.1rem",
});
