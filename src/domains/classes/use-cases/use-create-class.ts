import { EQueryKeys } from "@/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { classesService } from "../classes-service";

export function useCreateClass() {
  const queryClient = useQueryClient();

  const { mutate, mutateAsync, isPending, isError, isSuccess } = useMutation({
    mutationFn: classesService.createClass,
    onSuccess: (createdClass) => {
      queryClient.invalidateQueries({
        queryKey: [EQueryKeys.GET_CLASSES, createdClass.schoolId],
      });
      queryClient.invalidateQueries({ queryKey: [EQueryKeys.GET_SCHOOLS] });
      queryClient.invalidateQueries({
        queryKey: [EQueryKeys.GET_SCHOOL, createdClass.schoolId],
      });
    },
  });

  return {
    createClass: mutate,
    createClassAsync: mutateAsync,
    isCreatingClass: isPending,
    isErrorCreateClass: isError,
    isSuccessCreateClass: isSuccess,
  };
}
