import { Card } from "@/components/@ui/Card";
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

export const FormContainer = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '$4',

  '@lg': {
    gridTemplateColumns: 'repeat(1, 1fr)',
  },
})

export const FormCard = styled(Card, {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  '&>div': {
    display: 'flex',
    alignItems: 'center',
    gap: '$4',
  }
})

export const Section = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$4',

  padding: '$5 $7',

  background: '$base500',
  borderRadius: '$sm',

  textAlign: 'center',
})

export const Separator = styled('div', {
  width: '100%',
  height: '1px',
  background: '$base500',
})

export const ButtonContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',

  '&>div': {
    display: 'flex',
    alignItems: 'center',
    gap: '$4',
  }
})