import { EQueryKeys } from "@/shared";
import { useQuery } from "@tanstack/react-query";
import { schoolService } from "../school-service";

export function useGetSchoolList() {
  const { data, isPending, isFetching, isError, refetch } = useQuery({
    queryKey: [EQueryKeys.GET_SCHOOLS],
    queryFn: schoolService.getSchools,
  });

  return {
    schoolList: data,
    isLoadingSchoolList: isPending || isFetching,
    isErrorSchoolList: isError,
    refetchSchoolList: refetch,
  };
}
