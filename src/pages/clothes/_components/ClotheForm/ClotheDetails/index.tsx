import { Control, Controller, FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form"
import { ClotheFormData } from ".."
import { InputContainer, Separator } from "../styles"
import { Text } from "@/components/@ui/Text"
import { SelectInput } from "@/components/@ui/SelectInput"
import { brands, categories, genders, sizes } from "@/utils/enums"
import { SelectItem } from "@/components/@ui/SelectItem"
import { TextInput } from "@/components/@ui/TextInput"
import { brandDisplayNames, categoryDisplayNames, genderDisplayNames, sizeDisplayNames } from "@/utils/select-input-mapper"

export interface ProductDetailsProps {
  register: UseFormRegister<ClotheFormData>
  errors: FieldErrors<ClotheFormData>
  control: Control<ClotheFormData>
  watch: UseFormWatch<ClotheFormData>
}

export function ProductDetails({
  register,
  errors,
  control,
  watch,
}: ProductDetailsProps) {
  const brandField = watch('brand')
  const sizeField = watch('size')

  return (
    <>
      <div>
        <InputContainer>
          <Text type="label">Categoria</Text>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <SelectInput
                onValueChange={field.onChange}
                placeholder={'Categoria'}
                errorMessage={errors.category?.message}
                hasErrorPlaceholder
                {...field}
              >
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {categoryDisplayNames[category]}
                  </SelectItem>
                ))}
              </SelectInput>
            )}
          />
        </InputContainer>

        <InputContainer>
          <Text type="label">Gênero</Text>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <SelectInput
                value={field.value}
                onValueChange={field.onChange}
                placeholder="Gênero"
                errorMessage={errors.gender?.message}
                hasErrorPlaceholder
              >
                {genders.map((gender) => (
                  <SelectItem key={gender} value={gender}>
                    {genderDisplayNames[gender]}
                  </SelectItem>
                ))}
              </SelectInput>
            )}
          />
        </InputContainer>
      </div>

      <div>
        <InputContainer>
          <Text type="label">Marca</Text>
          <Controller
            name="brand"
            control={control}
            render={({ field }) => (
              <SelectInput
                value={field.value}
                onValueChange={field.onChange}
                placeholder="Marca"
                errorMessage={errors.category?.message}
                hasErrorPlaceholder
              >
                {brands.map((brand) => (
                  <SelectItem key={brand} value={brand}>
                    {brandDisplayNames[brand]}
                  </SelectItem>
                ))}
              </SelectInput>
            )}
          />
        </InputContainer>

        <InputContainer>
          <Text type="label">Tamanho</Text>
          <Controller
            name="size"
            control={control}
            render={({ field }) => (
              <SelectInput
                value={field.value}
                onValueChange={field.onChange}
                placeholder="Tamanho"
                errorMessage={errors.category?.message}
                hasErrorPlaceholder
              >
                {sizes.map((size) => (
                  <SelectItem key={size} value={size}>
                    {sizeDisplayNames[size]}
                  </SelectItem>
                ))}
              </SelectInput>
            )}
          />
        </InputContainer>
      </div>

      <div>
        {brandField === 'OTHER' && (
          <InputContainer css={{ width: '49%', marginBottom: '$4' }}>
            <Text type="label">Marca (Outro)</Text>
            <TextInput
              placeholder="Marca (Outra)"
              {...register('brandOther')}
            />
          </InputContainer>
        )}
        {sizeField === 'OTHER' && (
          <InputContainer
            css={{ width: '49%', marginLeft: 'auto', marginBottom: '$4' }}
          >
            <Text type="label">Tamanho (Outro)</Text>
            <TextInput
              placeholder="Tamanho (Outro)"
              {...register('sizeOther')}
            />
          </InputContainer>
        )}
      </div>

      <Separator />

      <div>
        <InputContainer>
          <Text type="label">Tecido</Text>
          <TextInput
            placeholder="Tecido"
            errorMessage={errors.fabric?.message}
            hasErrorPlaceholder
            {...register('fabric')}
          />
        </InputContainer>

        <InputContainer>
          <Text type="label">Cor</Text>
          <TextInput
            placeholder="Cor"
            errorMessage={errors.color?.message}
            hasErrorPlaceholder
            {...register('color')}
          />
        </InputContainer>
      </div>
    </>
  )
}