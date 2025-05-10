const genders = ['MALE', 'FEMALE', 'UNISEX'] as const

const brands = ['ALL', 'NIKE', 'ADIDAS', 'HERING', 'ZARA', 'FARM', 'CEA', 'RENNER', 'OTHER'] as const

const categories = [
  'ALL',
  'T_SHIRT',
  'SOCIAL_SHIRT',
  'SUIT',
  'ACTIVEWEAR',
  'DRESS',
  'PANTS',
  'SHORTS',
  'JACKET_HOODIE',
  'UNDERWEAR',
  'FOOTWEAR',
  'ACCESSORIES',
  'SLEEPWEAR',
  'SWIMWEAR',
] as const


const sizes = [
  'ALL',
  'XS',
  'S',
  'M',
  'L',
  'XL_LARGER',
  'N_34',
  'N_36',
  'N_38',
  'N_40',
  'N_42',
  'N_44',
  'N_46',
  'N_48',
  'N_50',
  'N_52',
  'N_54',
  'N_56_LARGER',
  'OTHER',
] as const

export { genders, brands, sizes, categories }