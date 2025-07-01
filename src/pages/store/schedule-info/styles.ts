import { Text } from "@/components/@ui/Text";
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
  },
});

export const Section = styled("div", {
  display: "flex",
  flexDirection: "column",

  "& > div": {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
});

export const IntervalItem = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "$3 $4",

  "& + &": {
    borderTop: "1px solid $base500",
  },
});

export const IntervalDay = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "$3",
});

export const IntervalInputs = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "$2",

  "input::-webkit-calendar-picker-indicator": {
    filter: "invert(100%) brightness(40%)",
  },
});

export const FormError = styled(Text, {
  color: "red",
  alignSelf: "flex-start",
  marginLeft: "$3",
  marginBottom: "$4",
});
