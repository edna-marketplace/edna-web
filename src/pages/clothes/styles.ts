import { styled } from "@edna-ui/react";

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  marginLeft: '230px',
  width: '100%',

  '@media (max-width: 768px)': {
    marginLeft: '0',
  }
})

export const Main = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$8',

  padding: '32px 183px',

  '@media (max-width: 1200px)': {
    padding: '32px 60px',
  },
  '@media (max-width: 768px)': {
    padding: '32px 16px',
  }
})

export const ClothesContainer = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  width: '100%',
})