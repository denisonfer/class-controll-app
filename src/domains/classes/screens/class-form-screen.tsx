import { Controller } from "react-hook-form";

import { Screen } from "@/components/layout";
import { ErrorView } from "@/components/layout/error-view";
import { Box } from "@/components/ui/box";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";

import { ClassFormSkeleton } from "./components/class-form-skeleton";
import { ClassShiftSelector } from "./components/class-shift-selector";
import { useClassFormScreen } from "./hooks/use-class-form-screen";

type TClassFormScreenProps = {
  schoolId: string;
  classId?: string;
};

export function ClassFormScreen({ schoolId, classId }: TClassFormScreenProps) {
  const {
    title,
    submitLabel,
    year,
    isEdit,
    isLoadingClass,
    isErrorClass,
    refetchClass,
    isSubmitting,
    isDeletingClass,
    isBusy,
    control,
    errors,
    onSubmit,
    onDeletePress,
  } = useClassFormScreen({ schoolId, classId });

  if (isErrorClass) {
    return (
      <ErrorView
        description="Não foi possível carregar a turma."
        onRetry={refetchClass}
      />
    );
  }

  return (
    <Screen title={title} isScrollable canGoBack>
      {isLoadingClass ? (
        <ClassFormSkeleton />
      ) : (
        <Box className="flex-1 gap-4">
          <Box className="gap-2">
            <Text className="text-sm text-muted-foreground">
              Nome da turma *
            </Text>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input isInvalid={Boolean(errors.name)}>
                  <InputField
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    autoCapitalize="sentences"
                    returnKeyType="done"
                    accessibilityLabel="Nome da turma"
                    placeholder="Ex: 1º Ano A"
                  />
                </Input>
              )}
            />
            {errors.name?.message ? (
              <Text className="text-sm text-destructive">
                {errors.name.message}
              </Text>
            ) : null}
          </Box>

          <Box className="gap-2">
            <Text className="text-sm text-muted-foreground">Turno *</Text>
            <Controller
              control={control}
              name="shift"
              render={({ field: { onChange, value } }) => (
                <ClassShiftSelector
                  value={value}
                  onChange={onChange}
                  isDisabled={isBusy}
                />
              )}
            />
          </Box>

          <Box className="gap-2">
            <Text className="text-sm text-muted-foreground">Ano letivo *</Text>
            <Input isDisabled>
              <InputField
                value={String(year)}
                editable={false}
                accessibilityLabel="Ano letivo"
              />
            </Input>
          </Box>

          <Button
            onPress={onSubmit}
            isDisabled={isBusy}
            accessibilityLabel={submitLabel}
          >
            {isSubmitting ? <ButtonSpinner /> : null}
            <ButtonText>{submitLabel}</ButtonText>
          </Button>

          {isEdit ? (
            <Button
              variant="outline"
              className="border-destructive"
              onPress={onDeletePress}
              isDisabled={isBusy}
              accessibilityLabel="Apagar turma"
            >
              {isDeletingClass ? <ButtonSpinner /> : null}
              <ButtonText className="text-destructive">Apagar turma</ButtonText>
            </Button>
          ) : null}
        </Box>
      )}
    </Screen>
  );
}
