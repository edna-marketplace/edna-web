import { styled } from "@edna-ui/react";
import { ComponentProps, ElementType } from "react";

export const Text = styled("p", {
  fontFamily: "$default",
  lineHeight: "$base",
  margin: 0,

  variants: {
    size: {
      xxs: { fontSize: "$xxs", fontWeight: "$bold" },
      xs: { fontSize: "$xs", fontWeight: "$bold" },
      sm: { fontSize: "$sm" },
      md: { fontSize: "$md" },
      lg: { fontSize: "$xl" },
    },
    weight: {
      bold: { fontWeight: "$bold" },
      regular: { fontWeight: "$regular" },
    },
    type: {
      default: {},
      label: {
        color: "$base300",
        marginBottom: "$1",
        fontWeight: "$bold",
        fontSize: "$sm",
      },
    },
  },

  defaultVariants: {
    size: "md",
    weight: "regular",
    type: "default",
  },
});

export interface TextProps extends ComponentProps<typeof Text> {
  as?: ElementType;
}
