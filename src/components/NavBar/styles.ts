import { styled } from "@edna-ui/react";

export const Container = styled('div', {
  position: 'fixed',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '$4',

  width: '230px',
  minHeight: '100vh',

  '@media (max-width: 1500px)': {
    width: '200px',
  },

  background: '$base100',
  padding: '$8'
})

export const Link = styled('button', {
  all: 'unset',

  display: 'flex',
  alignItems: 'center',
  gap: '$3',

  padding: '$3 $4',
  borderRadius: '$sm',

  fontSize: '$md',

  transition: 'background 0.2s',

  '&:not(:active):hover': {
    cursor: 'pointer',
    background: '$base200'
  },

  variants: {
    isActive: {
      true: {
        color: '$base700',
        background: '$base200',
      },
      false: {
        color: '$base500',
      }
    }
  }
})

export const DrawerToggle = styled('button', {
  position: 'fixed',
  top: '$4',
  left: '$4',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  zIndex: 1000,
});

export const DrawerOverlay = styled('div', {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0,0,0,0.5)',
  zIndex: 999,
});

export const DrawerContent = styled('div', {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '230px',
  height: '100vh',
  background: '$base100',
  padding: '$8',
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
  zIndex: 1000,
  transition: 'transform 0.3s ease-in-out',
});
