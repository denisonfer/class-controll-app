import {
  IClassDTO,
  TClass,
  TCreateClass,
  TCreateClassPayload,
  TUpdateClass,
  TUpdateClassPayload,
} from "./classes-types";

function toClass(dto: IClassDTO): TClass {
  return {
    id: dto.class_id,
    name: dto.class_name,
    shift: dto.class_shift,
    year: dto.class_year,
    schoolId: dto.school_id,
  };
}

function toCreatePayload(schoolClass: TCreateClass): TCreateClassPayload {
  return {
    class_name: schoolClass.name,
    class_shift: schoolClass.shift,
    class_year: schoolClass.year,
    school_id: schoolClass.schoolId,
  };
}

function toUpdatePayload(schoolClass: TUpdateClass): TUpdateClassPayload {
  return {
    class_name: schoolClass.name,
    class_shift: schoolClass.shift,
    class_year: schoolClass.year,
  };
}

export const classesAdapter = {
  toClass,
  toCreatePayload,
  toUpdatePayload,
};
