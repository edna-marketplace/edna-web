import { styled } from "@edna-ui/react";

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  marginLeft: '230px',
  width: '100%',

  '@xl': {
    marginLeft: '200px'
  },

  '@md': {
    marginLeft: '0',
  }
})

export const Main = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$8',

  padding: '$8 $40',

  '@xl': {
    padding: '$8 $12',
  },
  '@md': {
    padding: '$8 $4 $8 $12',
  }
})