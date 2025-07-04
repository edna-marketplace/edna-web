import { Container, Heading, InputContainer, SignUpForm } from './styles'

import { Button } from '@/components/@ui/Button'
import { SelectInput } from '@/components/@ui/SelectInput'
import { SelectItem } from '@/components/@ui/SelectItem'
import { SpecialTitle } from '@/components/@ui/SpecialTitle'
import { Text } from '@/components/@ui/Text'
import { TextInput } from '@/components/@ui/TextInput'
import { SignInSignUpSwitch } from '@/components/SwitchSignInSignUp'
import { useIsMobile } from '@/hooks/use-is-mobile'

import { verifyDuplicateSignUp } from '@/api/verify-duplicate-sign-up'
import { useSignUp } from '@/hooks/use-signup'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { useEffect, useState } from 'react'
import { StoreInfo } from '@/api/sign-up'
import { Spinner } from '@/components/Spinner'
import { CircleNotch } from '@phosphor-icons/react'

const cnpjRegex = /^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}$/
const phoneRegex = /^(\(\d{2}\)\s?9\s?\d{4}-\d{4}|\d{2}9\d{8})$/

const SignUpSchema = z.object({
  name: z
    .string()
    .min(1, 'Nome é obrigatório')
    .min(3, 'Nome deve ter pelo menos 3 caracteres'),
  cnpj: z
    .string()
    .min(1, 'CNPJ é obrigatório')
    .regex(cnpjRegex, 'CNPJ inválido')
    .transform((value) => value.replace(/[.\-\/\s+]/g, '')),
  email: z.string().min(1, 'E-mail é obrigatório').email('E-mail inválido'),
  phone: z
    .string()
    .min(1, 'Telefone é obrigatório')
    .regex(phoneRegex, 'Telefone inválido')
    .transform((value) => value.replace(/[(\[)\-\s+]/g, '')),
  targetCustomer: z.enum(['MALE', 'FEMALE', 'ALL'], {
    message: 'Selecione um público alvo',
  }),
})

type SignUpFormData = z.infer<typeof SignUpSchema>

export default function SignUp() {
  const { registerStore, getValue } = useSignUp()

  function getInputValues() {
    const data = getValue('storeInfo') as StoreInfo

    if (data && Object.keys(data).length > 0) {
      setValue('name', data.name, { shouldValidate: true })
      setValue('cnpj', data.cnpj, { shouldValidate: true })
      setValue('email', data.email, { shouldValidate: true })
      setValue('phone', data.phone, { shouldValidate: true })
      setValue('targetCustomer', data.targetCustomer, { shouldValidate: true })
    }
  }

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpSchema),
  })

  const router = useRouter()

  const isMobile = useIsMobile()

  async function handleContinue(data: SignUpFormData) {
    try {
      await verifyDuplicateSignUp(data)

      registerStore(data)

      router.push('/signup/register-address')
    } catch (error: any) {
      if (error.response.data.message) {
        toast.error('Erro ao registrar brechó!', {
          description: error.response.data.message,
        })
        return
      }
      toast.error('Erro ao registrar brechó!', {
        description:
          'Não foi possível registrar o brechó, tente novamente mais tarde.',
      })
    }
  }

  useEffect(() => {
    getInputValues()
  }, [])

  return (
    <Container>
      <Heading>
        <SpecialTitle size={isMobile ? 'sm' : 'md'}>
          Será um prazer ter o seu brechó na edna!
        </SpecialTitle>
        <Text size={isMobile ? 'xs' : 'sm'}>
          Por favor, insira as informações do seu brechó
        </Text>
      </Heading>

      <SignUpForm onSubmit={handleSubmit(handleContinue)}>
        <SignInSignUpSwitch />
        <InputContainer>
          <Text type="label" size="xs">
            Nome
          </Text>
          <TextInput
            maxLength={50}
            placeholder="Ex: Brechó da Edna"
            errorMessage={errors.name?.message}
            hasErrorPlaceholder
            {...register('name')}
          />
        </InputContainer>

        <InputContainer>
          <Text type="label" size="xs">
            CNPJ
          </Text>
          <TextInput
            maxLength={18}
            placeholder="Ex: 12.345.678/0001-90"
            errorMessage={errors.cnpj?.message}
            hasErrorPlaceholder
            {...register('cnpj')}
          />
        </InputContainer>

        <InputContainer>
          <Text type="label" size="xs">
            E-mail
          </Text>
          <TextInput
            maxLength={100}
            placeholder="Ex: brechoedna@exemplo.com"
            errorMessage={errors.email?.message}
            hasErrorPlaceholder
            {...register('email')}
          />
        </InputContainer>

        <InputContainer>
          <Text type="label" size="xs">
            Telefone
          </Text>
          <TextInput
            maxLength={16}
            placeholder="Ex: (48) 9 1234-5678"
            errorMessage={errors.phone?.message}
            hasErrorPlaceholder
            {...register('phone')}
          />
        </InputContainer>

        <InputContainer>
          <Text type="label" size="xs">
            Público alvo
          </Text>
          <Controller
            name="targetCustomer"
            control={control}
            render={({ field: { onChange, value } }) => (
              <SelectInput
                placeholder="Selecionar"
                value={value}
                onValueChange={onChange}
                errorMessage={errors.targetCustomer?.message}
                hasErrorPlaceholder
              >
                <SelectItem value="MALE">Moda Masculina</SelectItem>
                <SelectItem value="FEMALE">Moda Feminina</SelectItem>
                <SelectItem value="ALL">Todos os públicos</SelectItem>
              </SelectInput>
            )}
          />
        </InputContainer>
        <Button disabled={isSubmitting} type="submit" style={{ width: '100%' }}>
          {!isSubmitting ? 'Continuar' : <Spinner color="#FFF6D8" />}
        </Button>
      </SignUpForm>
    </Container>
  )
}
