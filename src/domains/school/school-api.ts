import { api } from "@/api";
import {
  ISchoolDTO,
  TCreateSchoolPayload,
  TUpdateSchoolPayload,
} from "./school-types";

async function getSchools(): Promise<ISchoolDTO[]> {
  const response = await api.get<ISchoolDTO[]>("/schools");
  return response.data;
}

async function createSchool(payload: TCreateSchoolPayload): Promise<ISchoolDTO> {
  const response = await api.post<ISchoolDTO>("/schools", payload);
  return response.data;
}

async function updateSchool(
  id: string,
  payload: TUpdateSchoolPayload,
): Promise<ISchoolDTO> {
  const response = await api.put<ISchoolDTO>(`/schools/${id}`, payload);
  return response.data;
}

async function deleteSchool(schoolId: string): Promise<void> {
  await api.delete(`/schools/${schoolId}`);
}

export const schoolApi = {
  getSchools,
  createSchool,
  updateSchool,
  deleteSchool,
};
