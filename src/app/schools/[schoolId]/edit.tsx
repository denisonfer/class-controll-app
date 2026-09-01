import { useLocalSearchParams } from "expo-router";

import { SchoolFormScreen } from "@/domains/school";

export default function EditSchoolRoute() {
  const { schoolId } = useLocalSearchParams<{ schoolId: string }>();
  const id = Array.isArray(schoolId) ? schoolId[0] : schoolId;

  return <SchoolFormScreen schoolId={id} />;
}
