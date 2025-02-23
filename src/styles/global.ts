import { globalCss } from '@edna-ui/react'

export const globalStyles = globalCss({
  '*': {
    boxSizing: 'border-box',
    padding: 0,
    margin: 0,
  },

  body: {
    backgroundColor: '$base700',
    color: '$base100',
    fontFamily: '$default',
    '-webkit-font-smoothing': 'antialiased',
  },
})
