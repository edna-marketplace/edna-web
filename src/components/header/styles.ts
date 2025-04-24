import { SpecialTitle, styled, Text } from "@edna-ui/react";

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  width: '100%',
  height: '210px',

  background: '$base600',

  padding: '100px 200px 36px',

  '@media (max-width: 1200px)': {
    padding: '50px 100px 16px',
    height: '150px',
  },
  '@media (max-width: 768px)': {
    padding: '$1 $4 $2 $20',
    height: '115px',
  }
})

export const Content = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'end',
  gap: '$2',

  height: '100%',
})

