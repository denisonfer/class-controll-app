import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";

import { useAppToast } from "@/shared";
import { TSchool } from "../../school-types";
import {
  schoolFormSchema,
  TSchoolFormValues,
} from "../../school-form-schema";
import { useCreateSchool } from "../../use-cases/use-create-school";
import { useGetSchool } from "../../use-cases/use-get-school";
import { useUpdateSchool } from "../../use-cases/use-update-school";

type TUseSchoolFormScreenParams = {
  schoolId?: string;
};

export function useSchoolFormScreen({ schoolId }: TUseSchoolFormScreenParams) {
  const router = useRouter();
  const { showSuccess, showError } = useAppToast();
  const isEdit = Boolean(schoolId);

  const { school, isLoadingSchool, isErrorSchool, refetchSchool } =
    useGetSchool(schoolId);

  const { createSchool, isCreatingSchool } = useCreateSchool();
  const { updateSchool, isUpdatingSchool } = useUpdateSchool();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TSchoolFormValues>({
    resolver: zodResolver(schoolFormSchema),
    defaultValues: {
      name: "",
      address: "",
    },
  });

  useEffect(() => {
    if (!school) {
      return;
    }

    reset({
      name: school.name,
      address: school.address,
    });
  }, [school, reset]);

  function onCreateSuccess(createdSchool: TSchool) {
    showSuccess("Escola cadastrada com sucesso.");

    if (router.canDismiss()) {
      router.dismiss();
    }

    router.push({
      pathname: "/schools/[schoolId]",
      params: { schoolId: createdSchool.id },
    });
  }

  function onUpdateSuccess() {
    showSuccess("Escola atualizada com sucesso.");
    router.dismissTo("/");
  }

  const onSubmit = handleSubmit((values) => {
    if (isCreatingSchool || isUpdatingSchool) {
      return;
    }

    if (isEdit && schoolId) {
      updateSchool(
        { id: schoolId, name: values.name, address: values.address },
        {
          onError: () => {
            showError("Não foi possível salvar a escola.");
          },
          onSuccess: onUpdateSuccess,
        },
      );
      return;
    }

    createSchool(values, {
      onError: () => {
        showError("Não foi possível cadastrar a escola.");
      },
      onSuccess: onCreateSuccess,
    });
  });

  return {
    isEdit,
    title: isEdit ? "Editar escola" : "Nova escola",
    submitLabel: isEdit ? "Salvar" : "Cadastrar",
    isLoadingSchool,
    isErrorSchool,
    refetchSchool,
    isSubmitting: isCreatingSchool || isUpdatingSchool,
    control,
    errors,
    onSubmit,
  };
}
