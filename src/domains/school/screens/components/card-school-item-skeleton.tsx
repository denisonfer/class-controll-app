import { Box } from "@/components/ui/box";
import { Skeleton } from "@/components/ui/skeleton";

export function CardSchoolItemSkeleton() {
  return (
    <Box className="mb-4 shadow-sm">
      <Box className="flex-row items-stretch overflow-hidden bg-card">
        <Box className="w-2 rounded-bl-full rounded-tl-full bg-primary" />

        <Box className="flex-1 gap-2 px-4 py-3">
          <Skeleton
            variant="rounded"
            startColor="bg-muted"
            className="h-6 w-3/4"
          />
          <Skeleton
            variant="rounded"
            startColor="bg-muted"
            className="h-4 w-1/2"
          />
          <Skeleton
            variant="rounded"
            startColor="bg-primary-light"
            className="mt-2 h-8 w-24"
          />
        </Box>

        <Box className="justify-center p-2">
          <Skeleton
            variant="circular"
            startColor="bg-muted"
            className="h-6 w-6"
          />
        </Box>
      </Box>
    </Box>
  );
}
