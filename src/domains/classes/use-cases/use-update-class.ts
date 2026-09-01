import { EQueryKeys } from "@/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { classesService } from "../classes-service";

export function useUpdateClass() {
  const queryClient = useQueryClient();

  const { mutate, mutateAsync, isPending, isError, isSuccess } = useMutation({
    mutationFn: classesService.updateClass,
    onSuccess: (updatedClass) => {
      queryClient.invalidateQueries({
        queryKey: [EQueryKeys.GET_CLASSES, updatedClass.schoolId],
      });
      queryClient.invalidateQueries({
        queryKey: [EQueryKeys.GET_SCHOOL, updatedClass.schoolId],
      });
    },
  });

  return {
    updateClass: mutate,
    updateClassAsync: mutateAsync,
    isUpdatingClass: isPending,
    isErrorUpdateClass: isError,
    isSuccessUpdateClass: isSuccess,
  };
}
