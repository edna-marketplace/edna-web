import { AlreadyHaveAccountContainer, ButtonContainer, Container, FormError, FormTitle, IntervalDay, IntervalInputs, IntervalItem, RegisterScheduleForm } from "./styles";

import { Button } from "@/components/@ui/Button";
import { Text } from "@/components/@ui/Text";


import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { useRouter } from "next/router";
import { toast } from "sonner";
import { convertTimeStringToMinutes } from "@/utils/convert-time-string-to-minutes";
import { getWeekDays } from "@/utils/get-week-days";
import { Checkbox } from "@/components/@ui/Checkbox";
import { TextInput } from "@/components/@ui/TextInput";
import { useIsMobile } from "@/hooks/use-is-mobile";

const registerScheduleFormSchema = z.object({
  intervals: z
    .array(
      z.object({
        dayOfWeek: z.number().min(0).max(6),
        enabled: z.boolean(),
        startTime: z.string(),
        endTime: z.string(),
      }),
    )
    .length(7)
    .refine((intervals) => intervals.filter((interval) => interval.enabled).length > 0, {
      message: 'Você precisa selecionar pelo menos um dia da semana',
    })
    .transform((intervals) => {
      return intervals.map((interval) => {
        return {
          dayOfWeek: interval.dayOfWeek,
          enabled: interval.enabled,
          openingTimeInMinutes: convertTimeStringToMinutes(interval.startTime),
          closingTimeInMinutes: convertTimeStringToMinutes(interval.endTime),
        }
      })
    })
    .refine(
      (intervals) => {
        return intervals.every(
          (interval) =>
            interval.closingTimeInMinutes - 60 >= interval.openingTimeInMinutes,
        )
      },
      {
        message:
          'O horário de término deve ter pelo menos 1 hora a mais que o de início',
      },
    ),
})

type RegisterScheduleFormOutput = z.output<typeof registerScheduleFormSchema>

export default function RegisterSchedule() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<any>({
    resolver: zodResolver(registerScheduleFormSchema),
    defaultValues: {
      intervals: [
        { dayOfWeek: 0, enabled: false, startTime: '09:00', endTime: '18:00' },
        { dayOfWeek: 1, enabled: true, startTime: '09:00', endTime: '18:00' },
        { dayOfWeek: 2, enabled: true, startTime: '09:00', endTime: '18:00' },
        { dayOfWeek: 3, enabled: true, startTime: '09:00', endTime: '18:00' },
        { dayOfWeek: 4, enabled: true, startTime: '09:00', endTime: '18:00' },
        { dayOfWeek: 5, enabled: true, startTime: '09:00', endTime: '18:00' },
        { dayOfWeek: 6, enabled: false, startTime: '09:00', endTime: '18:00' },
      ],
    },
  })

  const { fields } = useFieldArray({
    control,
    name: 'intervals',
  })

  const isMobile = useIsMobile()

  const router = useRouter()

  async function handleContinue(data: any) {
    try {
      const { intervals } = data as RegisterScheduleFormOutput;
      console.log(intervals)

      router.push('/signup/register-password')
    } catch (error: any) {
      toast.error(JSON.stringify(error.response.data));
    }
  }

  const dayOfWeeks = getWeekDays({ short: isMobile })

  const intervals = watch('intervals')

  return (
    <Container>
      <RegisterScheduleForm onSubmit={handleSubmit(handleContinue)}>
        <FormTitle style={{ alignSelf: 'flex-start' }}>
          Horário de atendimento
        </FormTitle>

        <div style={{ width: '100%', marginBottom: '16px' }}>
          {fields.map((field, index) => {
            return (
              <IntervalItem key={field.id}>
                <IntervalDay>
                  <Controller
                    name={`intervals.${index}.enabled`}
                    control={control}
                    render={({ field }) => {
                      return (
                        <Checkbox
                          onCheckedChange={(checked) => {
                            field.onChange(checked === true)
                          }}
                          checked={field.value}
                        />
                      )
                    }}
                  />
                  {/* @ts-ignore */}
                  <Text size={isMobile ? "sm" : "md"}>{dayOfWeeks[field.dayOfWeek]}</Text>
                </IntervalDay>
                <IntervalInputs>
                  <TextInput
                    type="time"
                    step={60}
                    disabled={!intervals[index].enabled}
                    {...register(`intervals.${index}.startTime`)}
                  />
                  <TextInput
                    type="time"
                    step={60}
                    disabled={!intervals[index].enabled}
                    {...register(`intervals.${index}.endTime`)}
                  />
                </IntervalInputs>
              </IntervalItem>
            )
          })}
        </div>

        {errors.intervals && (
          <>
            {/* @ts-ignore */}
            <FormError size="sm">{errors.intervals.root?.message}</FormError>
          </>
        )}

        <ButtonContainer>
          <Button type="button" variant="tertiary" onClick={() => router.back()} disabled={isSubmitting}>
            Voltar
          </Button>
          <Button disabled={isSubmitting} type='submit'>
            Continuar
          </Button>
        </ButtonContainer>
      </RegisterScheduleForm>

      <AlreadyHaveAccountContainer>
        <Text size="sm">
          Já possui uma conta?
        </Text>
        <Button type="button" variant="tertiary" onClick={() => router.push('/signin')} disabled={isSubmitting}>
          <Text size="sm" weight="bold">
            Entrar
          </Text>
        </Button>
      </AlreadyHaveAccountContainer>
    </Container>
  );
}