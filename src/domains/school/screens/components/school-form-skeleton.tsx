import { Box } from "@/components/ui/box";
import { Skeleton } from "@/components/ui/skeleton";

export function SchoolFormSkeleton() {
  return (
    <Box className="flex-1 gap-4">
      <Box className="gap-2">
        <Skeleton variant="rounded" startColor="bg-muted" className="h-4 w-16" />
        <Skeleton variant="rounded" startColor="bg-muted" className="h-9 w-full" />
      </Box>
      <Box className="gap-2">
        <Skeleton variant="rounded" startColor="bg-muted" className="h-4 w-24" />
        <Skeleton variant="rounded" startColor="bg-muted" className="h-9 w-full" />
      </Box>
      <Skeleton variant="rounded" startColor="bg-muted" className="mt-2 h-10 w-full" />
    </Box>
  );
}
