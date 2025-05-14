import { Card } from "@/components/@ui/Card";
import { Text } from "@/components/@ui/Text";
import { styled } from "@edna-ui/react";

export const InfoContainer = styled(Card, {
    display: 'flex',
    flexDirection: 'column',
    gap: '$9',

    width: '$80',

    [`& > ${Text}`]: {
        color: '$base300'
    },

    '& > div': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
})

export const ComparisonPercentage = styled('div', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    padding: '$1',

    borderRadius: '$xs',

    variants: {
        isNegative: {
            true: {
                background: '$red600',
                color: '#A8493B'
            },
            false: {
                background: '$blue600',
                color: '#487D79',
            }
        }
    }
})