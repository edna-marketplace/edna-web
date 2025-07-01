import { getViaCep } from "@/api/get-via-cep";
// import { updateSchedule } from "@/api/update-schedule";
import { Button } from "@/components/@ui/Button";
import { Card } from "@/components/@ui/Card";
import { Text } from "@/components/@ui/Text";
import { TextInput } from "@/components/@ui/TextInput";
import { Title } from "@/components/@ui/Title";
import { Header } from "@/components/Header";
import { Spinner } from "@/components/Spinner";
import { DayScheduleData } from "@/contexts/StoreContext";
import { useStore } from "@/hooks/use-store";
import { convertTimeStringToMinutes } from "@/utils/convert-time-string-to-minutes";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowsClockwise, CaretLeft } from "@phosphor-icons/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { ProfilePreview } from "../_components/ProfilePreview";
import {
  Container,
  Field,
  FormError,
  IntervalDay,
  IntervalInputs,
  IntervalItem,
  Main,
  RightColumn,
  Section,
} from "./styles";
import { convertMinutesToTimeString } from "@/utils/convert-minutes-to-time-string";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { getWeekDays } from "@/utils/get-week-days";
import { Checkbox } from "@/components/@ui/Checkbox";
import { updateSchedule } from "@/api/update-schedule";

const updateScheduleFormSchema = z.object({
  intervals: z
    .array(
      z.object({
        id: z.string(),
        dayOfWeek: z.number().min(0).max(6),
        enabled: z.boolean(),
        startTime: z.string(),
        endTime: z.string(),
      })
    )
    .length(7)
    .refine(
      (intervals) =>
        intervals.filter((interval) => interval.enabled).length > 0,
      {
        message: "Você precisa selecionar pelo menos um dia da semana",
      }
    )
    .transform((intervals) => {
      return intervals.map((interval) => {
        return {
          id: interval.id,
          dayOfWeek: interval.dayOfWeek,
          enabled: interval.enabled,
          openingTimeInMinutes: convertTimeStringToMinutes(interval.startTime),
          closingTimeInMinutes: convertTimeStringToMinutes(interval.endTime),
        };
      });
    })
    .refine(
      (intervals) => {
        return intervals.every(
          (interval) =>
            interval.closingTimeInMinutes - 60 >= interval.openingTimeInMinutes
        );
      },
      {
        message:
          "O horário de término deve ter pelo menos 1 hora a mais que o de início",
      }
    ),
});

type UpdateScheduleFormOutput = z.output<typeof updateScheduleFormSchema>;

export default function ScheduleInfo() {
  const { getValue } = useStore();

  function getInputValues() {
    const data = getValue("schedule") as DayScheduleData[];

    if (data && data.length > 0) {
      const formIntervals = data.map((item) => ({
        id: item.id,
        dayOfWeek: item.dayOfWeek,
        enabled: item.enabled,
        startTime: convertMinutesToTimeString(item.openingTimeInMinutes),
        endTime: convertMinutesToTimeString(item.closingTimeInMinutes),
      }));

      setValue("intervals", formIntervals, { shouldValidate: true });
    }
  }

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<any>({
    resolver: zodResolver(updateScheduleFormSchema),
  });

  const { fields } = useFieldArray({
    control,
    name: "intervals",
  });

  const isMobile = useIsMobile();

  const router = useRouter();

  async function handleUpdateScheduleInfo(data: UpdateScheduleFormOutput) {
    try {
      const { intervals } = data;

      await updateSchedule(intervals);

      toast.success("Horários atualizados com sucesso!");
    } catch (error: any) {
      if (error.response.data.message) {
        toast.error("Erro ao atualizar horários!", {
          description: error.response.data.message,
        });
        return;
      }

      toast.error("Erro ao atualizar horários!", {
        description:
          "Não foi possível atualizar os horários, tente novamente mais tarde.",
      });
    }
  }

  const dayOfWeeks = getWeekDays({ short: isMobile });

  const intervals = watch("intervals");

  useEffect(() => {
    getInputValues();
  }, []);

  return (
    <Container>
      <Header
        title="Brechó"
        description="Essa é a área do perfil do seu brechó, aqui você pode adicionar e alterar informações suas informações."
      />

      <Main>
        <ProfilePreview />

        <RightColumn>
          <Button
            variant="tertiary"
            style={{ width: "fit-content" }}
            onClick={() => router.push("/store")}
          >
            <CaretLeft weight="bold" />
            Voltar
          </Button>

          <Card>
            <Section>
              <Title size="sm" style={{ marginBottom: "16px" }}>
                Horários de atendimento
              </Title>

              <div style={{ width: "100%", marginBottom: "16px" }}>
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
                                  field.onChange(checked === true);
                                }}
                                checked={field.value}
                              />
                            );
                          }}
                        />
                        {/* @ts-ignore */}
                        <Text size={isMobile ? "sm" : "md"}>
                          {dayOfWeeks[(field as any).dayOfWeek]}
                        </Text>
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
                  );
                })}
              </div>

              {errors.intervals && (
                <>
                  <FormError size="sm">
                    {/* @ts-ignore */}
                    {errors.intervals.root?.message}
                  </FormError>
                </>
              )}

              <Button
                size="sm"
                style={{
                  width: "fit-content",
                  alignSelf: "end",
                }}
                disabled={isSubmitting}
                onClick={handleSubmit(handleUpdateScheduleInfo)}
              >
                {!isSubmitting ? (
                  <>
                    <ArrowsClockwise weight="bold" /> Atualizar horários
                  </>
                ) : (
                  <Spinner color="#FFF6D8" />
                )}
              </Button>
            </Section>
          </Card>
        </RightColumn>
      </Main>
    </Container>
  );
}
