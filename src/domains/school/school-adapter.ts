import { ISchoolDTO, TCreateSchool, TCreateSchoolPayload, TSchool } from "./school-types";

function toSchool(dto: ISchoolDTO): TSchool {
  return {
    id: dto.school_id,
    name: dto.school_name,
    address: dto.school_address,
    classesCount: dto.school_classes?.length ?? 0,
  };
}

function toPayload(school: TCreateSchool): TCreateSchoolPayload {
  return {
    school_name: school.name,
    school_address: school.address,
  };
}

export const schoolAdapter = {
  toSchool,
  toPayload,
};
