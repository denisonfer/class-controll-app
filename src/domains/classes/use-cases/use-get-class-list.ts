import { EQueryKeys } from "@/shared";
import { useQuery } from "@tanstack/react-query";
import { classesService } from "../classes-service";

export function useGetClassList(schoolId: string) {
  const { data, isPending, isFetching, isError } = useQuery({
    queryKey: [EQueryKeys.GET_CLASSES, schoolId],
    queryFn: () => classesService.getClasses(schoolId),
    enabled: !!schoolId,
  });

  return {
    classList: data,
    isLoadingClassesList: isPending || isFetching,
    isErrorClassesList: isError,
  };
}
