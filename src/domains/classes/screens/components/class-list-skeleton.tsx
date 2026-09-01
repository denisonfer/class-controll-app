import { Box } from "@/components/ui/box";
import { Skeleton } from "@/components/ui/skeleton";

const CLASS_SKELETON_ITEMS = 4;

export function ClassListSkeleton() {
  return (
    <Box className="flex-1">
      <Box className="mb-4 shadow-sm">
        <Box className="flex-row items-center bg-card px-4 py-3">
          <Box className="flex-1 gap-2">
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
              className="mt-1 h-4 w-40"
            />
          </Box>
          <Skeleton
            variant="circular"
            startColor="bg-muted"
            className="h-6 w-6"
          />
        </Box>
      </Box>

      <Skeleton
        variant="rounded"
        startColor="bg-muted"
        className="mb-4 h-6 w-24"
      />

      {Array.from({ length: CLASS_SKELETON_ITEMS }).map((_, index) => (
        <Box key={index} className="mb-4 shadow-sm">
          <Box className="flex-row items-center bg-card px-4 py-3">
            <Box className="flex-1 gap-2">
              <Skeleton
                variant="rounded"
                startColor="bg-muted"
                className="h-6 w-1/2"
              />
              <Skeleton
                variant="rounded"
                startColor="bg-muted"
                className="h-4 w-16"
              />
            </Box>
            <Skeleton
              variant="rounded"
              startColor="bg-muted"
              className="h-7 w-20"
            />
          </Box>
        </Box>
      ))}
    </Box>
  );
}
