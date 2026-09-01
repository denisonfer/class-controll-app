import { useLocalSearchParams } from "expo-router";

import { ClassFormScreen } from "@/domains/classes";

export default function NewClassRoute() {
  const { schoolId } = useLocalSearchParams<{ schoolId: string }>();
  const id = Array.isArray(schoolId) ? schoolId[0] : schoolId;

  return <ClassFormScreen schoolId={id ?? ""} />;
}
