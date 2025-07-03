import { styled } from "@edna-ui/react";

export const ButtonContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',

  '&>div': {
    display: 'flex',
    alignItems: 'center',
    gap: '$4',

    flex: 1,
    justifyContent: 'flex-end',
  },
})