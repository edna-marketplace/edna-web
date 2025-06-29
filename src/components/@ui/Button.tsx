import { styled } from "@edna-ui/react";
import { ComponentProps, ElementType } from "react";

export const Button = styled("button", {
  all: "unset",
  borderRadius: "$sm",
  fontSize: "$sm",
  fontWeight: "$regular",
  fontFamily: "$default",
  textAlign: "center",
  minWidth: 56,
  boxSizing: "border-box",
  padding: "$4 $4",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "$2",

  cursor: "pointer",
  userSelect: "none",

  svg: {
    width: "$5",
    height: "$5",
  },

  "&:disabled": {
    cursor: "not-allowed",
    opacity: ".5",
  },

  "&:focus": {
    boxShadow: "0 0 0 2px $colors$black",
  },

  transition: "background 200ms, color 200ms, border-color 200ms",

  variants: {
    variant: {
      primary: {
        color: "$white",
        background: "$base100",

        "&:not(:disabled):hover": {
          background: "$base200",
        },
      },

      secondary: {
        color: "$base100",
        background: "$base500",

        border: "1px solid transparent",

        "&:not(:disabled):hover": {
          borderColor: "$base400",
        },
      },

      tertiary: {
        color: "$base100",

        "&:not(:disabled):hover": {
          color: "$base300",
        },
      },

      destructive: {
        color: "$red400",
        background: "$red600",

        fontWeight: "$bold",

        border: "2px solid transparent",

        "&:not(:disabled):hover": {
          borderColor: "$red500",
        },
      },
    },

    size: {
      sm: {
        height: 38,
      },
      md: {
        height: 57,
      },
    },
  },

  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

export interface ButtonProps extends ComponentProps<typeof Button> {
  as?: ElementType;
}
