import { keyframes, styled } from "@edna-ui/react";

const spin = keyframes({
  from: { transform: "rotate(0deg)" },
  to: { transform: "rotate(360deg)" },
});

export const Container = styled("div", {
  svg: {
    animation: `${spin} 1s linear infinite`,
  },
});
