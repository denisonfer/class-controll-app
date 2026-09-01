import { api } from "@/api";
import {
  IClassDTO,
  TCreateClassPayload,
  TUpdateClassPayload,
} from "./classes-types";

async function getClasses(schoolId: string): Promise<IClassDTO[]> {
  const response = await api.get<IClassDTO[]>(`/classes`, {
    params: {
      school_id: schoolId,
    },
  });

  return response.data;
}

async function createClass(payload: TCreateClassPayload): Promise<IClassDTO> {
  const response = await api.post<IClassDTO>("/classes", payload);
  return response.data;
}

async function updateClass(
  id: string,
  payload: TUpdateClassPayload,
): Promise<IClassDTO> {
  const response = await api.put<IClassDTO>(`/classes/${id}`, payload);
  return response.data;
}

async function deleteClass(classId: string): Promise<void> {
  await api.delete(`/classes/${classId}`);
}

export const classesApi = {
  getClasses,
  createClass,
  updateClass,
  deleteClass,
};
