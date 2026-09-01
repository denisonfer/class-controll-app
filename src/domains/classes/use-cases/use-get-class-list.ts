import { EQueryKeys } from "@/shared";
import { useQuery } from "@tanstack/react-query";
import { classesService } from "../classes-service";

export function useGetClassList(schoolId: string) {
  const enabled = !!schoolId;

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: [EQueryKeys.GET_CLASSES, schoolId],
    queryFn: () => classesService.getClasses(schoolId),
    enabled,
  });

  return {
    classList: data,
    isLoadingClassesList: enabled && isPending && !data,
    isErrorClassesList: enabled && isError && !data,
    refetchClassesList: refetch,
  };
}
