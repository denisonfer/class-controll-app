import { Box } from "@/components/ui/box";
import { Skeleton } from "@/components/ui/skeleton";

export function ClassFormSkeleton() {
  return (
    <Box className="flex-1 gap-4">
      <Box className="gap-2">
        <Skeleton variant="rounded" startColor="bg-muted" className="h-4 w-32" />
        <Skeleton variant="rounded" startColor="bg-muted" className="h-9 w-full" />
      </Box>
      <Box className="gap-2">
        <Skeleton variant="rounded" startColor="bg-muted" className="h-4 w-16" />
        <Box className="flex-row gap-2">
          <Skeleton variant="rounded" startColor="bg-muted" className="h-9 flex-1" />
          <Skeleton variant="rounded" startColor="bg-muted" className="h-9 flex-1" />
          <Skeleton variant="rounded" startColor="bg-muted" className="h-9 flex-1" />
        </Box>
      </Box>
      <Box className="gap-2">
        <Skeleton variant="rounded" startColor="bg-muted" className="h-4 w-24" />
        <Skeleton variant="rounded" startColor="bg-muted" className="h-9 w-full" />
      </Box>
      <Skeleton variant="rounded" startColor="bg-muted" className="mt-2 h-10 w-full" />
    </Box>
  );
}
