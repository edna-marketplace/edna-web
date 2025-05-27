import { styled } from "@edna-ui/react";
import { Button } from "../@ui/Button";

export const Container = styled('div', {
  position: 'relative',
  zIndex: 0,

  background: '$base500',
  borderRadius: '$sm',
  width: '100%',
  height: '56px',

  padding: '$1',
})

export const SelectedContainer = styled('div', {
  borderRadius: '$xs',
  background: '$base700',

  width: '45%',
  height: '48px',

  position: 'absolute',
  transition: 'transform 0.3s ease, width 0.3s ease',

  variants: {
    position: {
      signin: {
        transform: 'translateX(0%)'
      },
      signup: {
        width: '52%',
        transform: 'translateX(87%)'
      }
    }
  },

  defaultVariants: {
    position: 'login'
  }
})

export const ButtonContainer = styled('div', {
  position: 'absolute',
  left: 0,
  top: 0,
  zIndex: 1,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  width: '100%',
  height: '100%',

  [`${Button}`]: {
    fontWeight: '$bold',
    boxShadow: 'none',
    zIndex: 2
  }
})