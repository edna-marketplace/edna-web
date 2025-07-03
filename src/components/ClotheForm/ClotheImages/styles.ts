import { styled } from "@edna-ui/react";

export const TipContainer = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignSelf: 'center',
  gap: '-20px',

  padding: '$2',

  textAlign: 'center',

  marginTop: '-$10',
  marginBottom: '$4',

  height: 'fit-content',
  width: 'fit-content',

  backgroundColor: '$base700',

  border: '1px solid $base400',
  borderRadius: '$sm',

  fontWeight: '$bold',
})