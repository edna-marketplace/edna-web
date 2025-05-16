import { Text } from '@/components/@ui/Text'
import { ComparisonPercentage, InfoContainer } from './styles'
import { Title } from '@edna-ui/react'
import { CaretDown, CaretUp } from '@phosphor-icons/react'

export interface InfoCardProps {
    title: string
    value: number
    percentage: number
    type: 'default' | 'currency'
}

export function InfoCard({
    title,
    value,
    percentage,
    type,
}: InfoCardProps){
    const isNegative = percentage < 0

    return (
        <>
            <InfoContainer>
                <Text size="md">{title}</Text>
                <Title>
                    { type === 'currency' ? (
                        value.toLocaleString('pt-br', {
                            style: 'currency',
                            currency: 'BRL'
                        })
                    ) : (
                        value
                    )}
                </Title>
                <div>
                    <Text size="xs">Desde semana passada</Text>
                    <ComparisonPercentage isNegative={isNegative}>
                        <Text size="xs" weight="bold">{percentage}%</Text>
                        {percentage > 0 ? (<CaretUp size={14} weight='bold'/>) : (<CaretDown size={14} weight='bold'/>)}
                    </ComparisonPercentage>                
                </div>
            </InfoContainer>
        </>
    )
}