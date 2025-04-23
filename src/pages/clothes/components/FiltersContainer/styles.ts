import { Card, styled } from "@edna-ui/react";

export const Container = styled(Card, {
  display: 'flex',
  alignItems: 'flex-end',
  gap: '$2',

  div: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$1',
    flex: 1,
  }
})