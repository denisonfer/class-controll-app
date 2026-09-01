import { TSchool } from "./school-types";

export function filterSchools(schools: TSchool[], query: string): TSchool[] {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return schools;
  }

  return schools.filter((school) => {
    return (
      school.name.toLowerCase().includes(normalizedQuery) ||
      school.address.toLowerCase().includes(normalizedQuery)
    );
  });
}
