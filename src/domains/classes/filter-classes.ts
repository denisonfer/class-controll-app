import { getClassShiftLabel } from "./class-shift";
import { TClass } from "./classes-types";

export function filterClasses(classes: TClass[], query: string): TClass[] {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return classes;
  }

  return classes.filter((classItem) => {
    const shiftLabel = getClassShiftLabel(classItem.shift).toLowerCase();
    const year = String(classItem.year);

    return (
      classItem.name.toLowerCase().includes(normalizedQuery) ||
      year.includes(normalizedQuery) ||
      shiftLabel.includes(normalizedQuery)
    );
  });
}
