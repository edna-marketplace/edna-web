import { styled } from "@edna-ui/react";

export const FileInputContainer = styled("div", {
  backgroundColor: "$base700",
  borderRadius: "$sm",
  boxSizing: "border-box",
  border: "1px solid $base500",

  position: "relative",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  flex: 1,
  maxWidth: "200px",

  "&:has(input:change)": {
    boxShadow: "0 0 0 2px $colors$black",
  },

  "&:has(input:disabled)": {
    opacity: 0.5,
    cursor: "not-allowed",
  },

  transition: "border-color 0.2s",

  "&:not(:disabled):hover": {
    borderColor: "$base400",
    cursor: "pointer",
  },

  variants: {
    hasError: {
      true: {
        borderColor: "red",
      },
    },
  },
});

export const Input = styled("input", {
  display: "none",
});

export const Label = styled("label", {
  fontFamily: "$default",
  fontSize: "$sm",
  color: "$base100",
  fontWeight: "regular",
  background: "transparent",
  padding: "$3 $4",

  display: "flex",
  alignItems: "center",
  gap: "$3",

  "&:disabled": {
    cursor: "not-allowed",
  },

  "&:not(:disabled):hover": {
    borderColor: "$base400",
    cursor: "pointer",
  },

  variants: {
    size: {
      md: {
        fontSize: "$sm",
      },
      sm: {
        fontSize: "$xs",
      },
    },
  },

  defaultVariants: {
    size: "md",
  },
});

export const FileCountIndicator = styled("div", {
  position: "absolute",
  top: "-6px",
  left: "-6px",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  backgroundColor: "$base500",
  color: "$base100",
  borderRadius: "50%",

  width: "20px",
  height: "20px",

  fontSize: "$xs",
  fontWeight: "bold",
  zIndex: 1,
});

export const ErrorContainer = styled("div", {
  height: "1.5rem",
  margin: "0",
});

export const ErrorPlaceholder = styled("div", {
  height: "1.5rem",
});

export const ErrorMessage = styled("p", {
  color: "red",
  fontSize: "$xs",
  height: "1.5rem",
});
