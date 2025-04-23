import { styled, Text } from "@edna-ui/react";

export const Container = styled('div', {
    display: 'flex',
    flexDirection: 'column',

    width: '100%',
    height: '300px',

    background: '$base600',

    padding: '100px 200px 36px'
})

export const Content = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'end',
    gap: '$5',

    height: '100%',

    [`${Text}`]: {
        color: '$base300'
    }
})

