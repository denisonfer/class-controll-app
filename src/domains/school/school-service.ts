import { schoolAdapter } from "./school-adapter";
import { schoolApi } from "./school-api";
import { TCreateSchool, TSchool, TUpdateSchool } from "./school-types";

async function getSchools(): Promise<TSchool[]> {
  const getSchoolDto = await schoolApi.getSchools();

  return getSchoolDto.map(schoolAdapter.toSchool);
}

async function getSchool(id: string): Promise<TSchool> {
  const schoolDto = await schoolApi.getSchool(id);
  return schoolAdapter.toSchool(schoolDto);
}

async function createSchool(school: TCreateSchool): Promise<TSchool> {
  const createSchoolDto = await schoolApi.createSchool(
    schoolAdapter.toPayload(school),
  );
  return schoolAdapter.toSchool(createSchoolDto);
}

async function updateSchool(school: TUpdateSchool): Promise<TSchool> {
  const updateSchoolDto = await schoolApi.updateSchool(
    school.id,
    schoolAdapter.toPayload(school),
  );
  return schoolAdapter.toSchool(updateSchoolDto);
}

async function deleteSchool(schoolId: string): Promise<void> {
  await schoolApi.deleteSchool(schoolId);
}

export const schoolService = {
  getSchools,
  getSchool,
  createSchool,
  updateSchool,
  deleteSchool,
};
