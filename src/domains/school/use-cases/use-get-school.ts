import { EQueryKeys } from "@/shared";
import { useQuery } from "@tanstack/react-query";
import { schoolService } from "../school-service";

export function useGetSchool(schoolId?: string) {
  const enabled = !!schoolId;

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: [EQueryKeys.GET_SCHOOL, schoolId],
    queryFn: () => schoolService.getSchool(schoolId as string),
    enabled,
  });

  return {
    school: data,
    isLoadingSchool: enabled && isPending && !data,
    isErrorSchool: enabled && isError && !data,
    refetchSchool: refetch,
  };
}
