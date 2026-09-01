import { Box } from "@/components/ui/box";
import { CardSchoolItemSkeleton } from "./card-school-item-skeleton";

const SKELETON_ITEMS = 5;

export function SchoolListSkeleton() {
  return (
    <Box className="flex-1">
      {Array.from({ length: SKELETON_ITEMS }).map((_, index) => (
        <CardSchoolItemSkeleton key={index} />
      ))}
    </Box>
  );
}
