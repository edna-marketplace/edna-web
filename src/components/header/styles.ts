import { styled } from "@edna-ui/react";

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  width: '100%',
  height: '210px',

  background: '$base600',

  padding: '$20 $40 $8',

  '@media (max-width: 1500px)': {
    padding: '$12 $12 $4',
    height: '$40',
  },
  '@media (max-width: 768px)': {
    padding: '$8 $16',
    height: '$40',
  }
})

export const Content = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'end',
  gap: '$2',

  height: '100%',
})

