import { useLocalSearchParams } from "expo-router";

import { ClassListScreen } from "@/domains/classes";

export default function SchoolClassesRoute() {
  const { schoolId } = useLocalSearchParams<{ schoolId: string }>();
  const id = Array.isArray(schoolId) ? schoolId[0] : schoolId;

  return <ClassListScreen schoolId={id ?? ""} />;
}
