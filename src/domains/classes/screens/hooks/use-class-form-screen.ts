import { useEffect } from "react";
import { Alert } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";

import { useAppToast } from "@/shared";
import {
  classFormSchema,
  TClassFormValues,
} from "../../class-form-schema";
import { TClass } from "../../classes-types";
import { useCreateClass } from "../../use-cases/use-create-class";
import { useDeleteClass } from "../../use-cases/use-delete-class";
import { useGetClassList } from "../../use-cases/use-get-class-list";
import { useUpdateClass } from "../../use-cases/use-update-class";

type TUseClassFormScreenParams = {
  schoolId: string;
  classId?: string;
};

export function useClassFormScreen({
  schoolId,
  classId,
}: TUseClassFormScreenParams) {
  const router = useRouter();
  const { showSuccess, showError } = useAppToast();
  const isEdit = Boolean(classId);
  const currentYear = new Date().getFullYear();

  const {
    classList,
    isLoadingClassesList,
    isErrorClassesList,
    refetchClassesList,
  } = useGetClassList(isEdit ? schoolId : "");

  const { createClass, isCreatingClass } = useCreateClass();
  const { updateClass, isUpdatingClass } = useUpdateClass();
  const { deleteClass, isDeletingClass } = useDeleteClass();

  const schoolClass: TClass | undefined = classList?.find(
    (item) => item.id === classId,
  );

  const isLoadingClass = isEdit && isLoadingClassesList;
  const isErrorClass =
    isEdit &&
    (!schoolId ||
      !classId ||
      isErrorClassesList ||
      (classList !== undefined && !schoolClass));

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TClassFormValues>({
    resolver: zodResolver(classFormSchema),
    defaultValues: {
      name: "",
      shift: "morning",
    },
  });

  useEffect(() => {
    if (!schoolClass) {
      return;
    }

    reset({
      name: schoolClass.name,
      shift: schoolClass.shift,
    });
  }, [schoolClass, reset]);

  function navigateBackToList() {
    if (isEdit) {
      if (router.canGoBack()) {
        router.back();
        return;
      }

      router.replace({
        pathname: "/schools/[schoolId]",
        params: { schoolId },
      });
      return;
    }

    if (router.canDismiss()) {
      router.dismiss();
      return;
    }

    router.back();
  }

  function onCreateSuccess() {
    showSuccess("Turma cadastrada com sucesso.");
    navigateBackToList();
  }

  function onUpdateSuccess() {
    showSuccess("Turma atualizada com sucesso.");
    navigateBackToList();
  }

  function onDeleteSuccess() {
    showSuccess("Turma apagada com sucesso.");
    navigateBackToList();
  }

  const isBusy = isCreatingClass || isUpdatingClass || isDeletingClass;

  const onSubmit = handleSubmit((values) => {
    if (isBusy) {
      return;
    }

    if (isEdit && classId) {
      if (!schoolClass) {
        return;
      }

      updateClass(
        {
          id: classId,
          name: values.name,
          shift: values.shift,
          year: schoolClass.year,
        },
        {
          onError: () => {
            showError("Não foi possível salvar a turma.");
          },
          onSuccess: onUpdateSuccess,
        },
      );
      return;
    }

    createClass(
      {
        name: values.name,
        shift: values.shift,
        year: currentYear,
        schoolId,
      },
      {
        onError: () => {
          showError("Não foi possível salvar a turma.");
        },
        onSuccess: onCreateSuccess,
      },
    );
  });

  function confirmDelete() {
    if (!classId || isBusy) {
      return;
    }

    deleteClass(classId, {
      onError: () => {
        showError("Não foi possível apagar a turma.");
      },
      onSuccess: onDeleteSuccess,
    });
  }

  function onDeletePress() {
    if (isBusy) {
      return;
    }

    Alert.alert("Apagar turma?", "Essa ação não pode ser desfeita.", [
      { text: "Cancelar", style: "cancel" },
      { text: "Apagar", style: "destructive", onPress: confirmDelete },
    ]);
  }

  return {
    isEdit,
    title: isEdit ? "Editar turma" : "Nova turma",
    submitLabel: "Salvar Turma",
    year: schoolClass?.year ?? currentYear,
    isLoadingClass,
    isErrorClass,
    refetchClass: refetchClassesList,
    isSubmitting: isCreatingClass || isUpdatingClass,
    isDeletingClass,
    isBusy,
    control,
    errors,
    onSubmit,
    onDeletePress,
  };
}
