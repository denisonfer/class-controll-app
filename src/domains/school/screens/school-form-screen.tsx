import { Controller } from "react-hook-form";

import { Screen } from "@/components/layout";
import { ErrorView } from "@/components/layout/error-view";
import { Box } from "@/components/ui/box";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";

import { SchoolFormSkeleton } from "./components/school-form-skeleton";
import { useSchoolFormScreen } from "./hooks/use-school-form-screen";

type TSchoolFormScreenProps = {
  schoolId?: string;
};

export function SchoolFormScreen({ schoolId }: TSchoolFormScreenProps) {
  const {
    title,
    submitLabel,
    isLoadingSchool,
    isErrorSchool,
    refetchSchool,
    isSubmitting,
    control,
    errors,
    onSubmit,
  } = useSchoolFormScreen({ schoolId });

  if (isErrorSchool) {
    return (
      <ErrorView
        description="Não foi possível carregar a escola."
        onRetry={refetchSchool}
      />
    );
  }

  return (
    <Screen title={title} isScrollable canGoBack>
      {isLoadingSchool ? (
        <SchoolFormSkeleton />
      ) : (
        <Box className="flex-1 gap-4">
          <Box className="gap-2">
            <Text className="text-sm text-foreground">Nome</Text>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input isInvalid={Boolean(errors.name)}>
                  <InputField
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    autoCapitalize="words"
                    returnKeyType="next"
                    accessibilityLabel="Nome da escola"
                  />
                </Input>
              )}
            />
            {errors.name?.message ? (
              <Text className="text-sm text-destructive">{errors.name.message}</Text>
            ) : null}
          </Box>

          <Box className="gap-2">
            <Text className="text-sm text-foreground">Endereço</Text>
            <Controller
              control={control}
              name="address"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input isInvalid={Boolean(errors.address)}>
                  <InputField
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    returnKeyType="done"
                    accessibilityLabel="Endereço da escola"
                    onSubmitEditing={() => {
                      if (!isSubmitting) {
                        onSubmit();
                      }
                    }}
                  />
                </Input>
              )}
            />
            {errors.address?.message ? (
              <Text className="text-sm text-destructive">
                {errors.address.message}
              </Text>
            ) : null}
          </Box>

          <Button
            onPress={onSubmit}
            isDisabled={isSubmitting}
            accessibilityLabel={submitLabel}
          >
            {isSubmitting ? <ButtonSpinner /> : null}
            <ButtonText>{submitLabel}</ButtonText>
          </Button>
        </Box>
      )}
    </Screen>
  );
}
