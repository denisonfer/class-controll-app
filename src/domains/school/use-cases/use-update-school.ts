import { EQueryKeys } from "@/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { schoolService } from "../school-service";

export function useUpdateSchool() {
  const queryClient = useQueryClient();

  const { mutate, mutateAsync, isPending, isError, isSuccess } = useMutation({
    mutationFn: schoolService.updateSchool,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EQueryKeys.GET_SCHOOLS] });
    },
  });

  return {
    updateSchool: mutate,
    updateSchoolAsync: mutateAsync,
    isUpdatingSchool: isPending,
    isErrorUpdateSchool: isError,
    isSuccessUpdateSchool: isSuccess,
  };
}
