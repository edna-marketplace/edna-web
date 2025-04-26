import { Card } from "@/components/@ui/Card";
import { styled } from "@edna-ui/react";

export const Container = styled(Card, {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'flex-end',
  gap: '$2',

  div: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
})