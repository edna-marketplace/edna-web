import { Title } from '@/components/@ui/Title'
import { ComponentProps } from 'react'
import { ClotheImage, Container, Dot, InfoContainer } from './styles'
import { ClotheSummary } from '@/api/fetch-clothes-with-filter'

type ClotheItemProps = ComponentProps<typeof Container> & {
  clothe: ClotheSummary
}

export function ClotheItem({ clothe, ...props }: ClotheItemProps) {
  const brandMapper: Record<string, string> = {
    NIKE: 'Nike',
    ADIDAS: 'Adidas',
    HERING: 'Hering',
    ZARA: 'Zara',
    FARM: 'Farm',
    CEA: 'C&A',
    RENNER: 'Renner',
    OTHER: 'Outro',
  }

  const sizeMapper: Record<string, string> = {
    XS: 'PP',
    S: 'P',
    M: 'M',
    L: 'G',
    XL_LARGER: 'GG+',
    N_34: '34',
    N_36: '36',
    N_38: '38',
    N_40: '40',
    N_42: '42',
    N_44: '44',
    N_46: '46',
    N_48: '48',
    N_50: '50',
    N_52: '52',
    N_54: '54',
    N_56_LARGER: '56+',
    OTHER: 'Outro',
  }

  return (
    <Container {...props}>
      <ClotheImage src={clothe.imageURL} alt="" width={170} height={170} />
      <Title size="sm">
        {(clothe.priceInCents / 100).toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        })}
      </Title>

      <Title size="xs" color="base200">
        {clothe.name.length > 22
          ? `${clothe.name.slice(0, 17)}...`
          : clothe.name}
      </Title>

      <InfoContainer>
        <Title size="xs" color="base400">
          {clothe.brand === 'OTHER' && clothe.brandOther
            ? clothe.brandOther.length > 10
              ? `${clothe.brandOther.slice(0, 7)}...`
              : clothe.brandOther === 'OTHER'
              ? brandMapper.OTHER
              : clothe.brandOther
            : brandMapper[clothe.brand].length > 10
            ? `${brandMapper[clothe.brand].slice(0, 7)}`
            : brandMapper[clothe.brand]}
        </Title>
        <Dot />
        <Title size="xs" color="base400">
          {clothe.size === 'OTHER' && clothe.sizeOther
            ? clothe.sizeOther.length > 7
              ? `${clothe.sizeOther.slice(0, 5)}...`
              : clothe.sizeOther === 'OTHER'
              ? sizeMapper.OTHER
              : clothe.sizeOther
            : sizeMapper[clothe.size].length > 5
            ? `${sizeMapper[clothe.size].slice(0, 5)}`
            : sizeMapper[clothe.size]}
        </Title>
      </InfoContainer>
    </Container>
  )
}
