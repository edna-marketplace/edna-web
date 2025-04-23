import { styled } from "@edna-ui/react";

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  width: '100%'
})

export const Main = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$8',

  padding: '32px 200px'
})

export const Separator = styled('div', {
  width: '100%',
  height: '1px',
  background: '$base500',
})