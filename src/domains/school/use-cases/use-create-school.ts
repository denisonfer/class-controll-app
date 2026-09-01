import { EQueryKeys } from "@/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { schoolService } from "../school-service";

export function useCreateSchool() {
  const queryClient = useQueryClient();

  const { mutate, mutateAsync, isPending, isError, isSuccess } = useMutation({
    mutationFn: schoolService.createSchool,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EQueryKeys.GET_SCHOOLS] });
    },
  });

  return {
    createSchool: mutate,
    createSchoolAsync: mutateAsync,
    isCreatingSchool: isPending,
    isErrorCreateSchool: isError,
    isSuccessCreateSchool: isSuccess,
  };
}
