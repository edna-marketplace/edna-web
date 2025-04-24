import { styled } from "@edna-ui/react";

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  marginLeft: '230px',
  width: '100%',

  '@media (max-width: 1500px)': {
    marginLeft: '200px'
  },

  '@media (max-width: 768px)': {
    marginLeft: '0',
  }
})

export const Main = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$8',

  padding: '$8 $40',

  '@media (max-width: 1500px)': {
    padding: '$8 $12',
  },
  '@media (max-width: 768px)': {
    padding: '$8 $4 $8 $12',
  }
})

export const ClothesContainer = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(6, 1fr)',
  width: '100%',
  '@media (max-width: 1500px)': {
    gridTemplateColumns: 'repeat(5, 1fr)',
  },
  '@media (max-width: 1200px)': {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
  '@media (max-width: 992px)': {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
  '@media (max-width: 650px)': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  }
})