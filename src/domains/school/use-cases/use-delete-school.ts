import { EQueryKeys } from "@/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { schoolService } from "../school-service";

export function useDeleteSchool() {
  const queryClient = useQueryClient();

  const { mutate, mutateAsync, isPending, isError, isSuccess } = useMutation({
    mutationFn: schoolService.deleteSchool,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EQueryKeys.GET_SCHOOLS] });
      queryClient.invalidateQueries({ queryKey: [EQueryKeys.GET_CLASSES] });
    },
  });

  return {
    deleteSchool: mutate,
    deleteSchoolAsync: mutateAsync,
    isDeletingSchool: isPending,
    isErrorDeleteSchool: isError,
    isSuccessDeleteSchool: isSuccess,
  };
}
