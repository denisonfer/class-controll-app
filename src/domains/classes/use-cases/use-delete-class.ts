import { EQueryKeys } from "@/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { classesService } from "../classes-service";

export function useDeleteClass() {
  const queryClient = useQueryClient();

  const { mutate, mutateAsync, isPending, isError, isSuccess } = useMutation({
    mutationFn: classesService.deleteClass,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EQueryKeys.GET_CLASSES] });
      queryClient.invalidateQueries({ queryKey: [EQueryKeys.GET_SCHOOLS] });
    },
  });

  return {
    deleteClass: mutate,
    deleteClassAsync: mutateAsync,
    isDeletingClass: isPending,
    isErrorDeleteClass: isError,
    isSuccessDeleteClass: isSuccess,
  };
}
