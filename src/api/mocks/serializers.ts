import type { IClassDTO, TClassShift } from "@/domains/classes/classes-types";
import type { ISchoolDTO } from "@/domains/school/school-types";

function requireId(id: string | undefined): string {
  if (id == null) {
    throw new Error("Mirage model is missing id");
  }

  return id;
}

function toClassShift(value: string): TClassShift {
  if (value === "morning" || value === "afternoon" || value === "evening") {
    return value;
  }

  throw new Error(`Invalid class shift: ${value}`);
}

type TMirageClass = {
  id?: string;
  name: string;
  shift: string;
  year: number;
  schoolId?: string;
  school?: { id?: string } | null;
};

type TMirageSchool = {
  id?: string;
  name: string;
  address: string;
  schoolClasses?: { models: TMirageClass[] };
};

export function serializeClass(model: TMirageClass): IClassDTO {
  return {
    class_id: requireId(model.id),
    class_name: model.name,
    class_shift: toClassShift(model.shift),
    class_year: model.year,
    school_id: requireId(model.schoolId ?? model.school?.id),
  };
}

export function serializeSchool(model: TMirageSchool): ISchoolDTO {
  return {
    school_id: requireId(model.id),
    school_name: model.name,
    school_address: model.address,
    school_classes: (model.schoolClasses?.models ?? []).map(serializeClass),
  };
}
