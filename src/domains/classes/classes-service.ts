import { classesAdapter } from "./classes-adapter";
import { classesApi } from "./classes-api";
import { TClass, TCreateClass, TUpdateClass } from "./classes-types";

async function getClasses(schoolId: string): Promise<TClass[]> {
  const getClassesDto = await classesApi.getClasses(schoolId);

  return getClassesDto.map(classesAdapter.toClass);
}

async function createClass(schoolClass: TCreateClass): Promise<TClass> {
  const createClassDto = await classesApi.createClass(
    classesAdapter.toCreatePayload(schoolClass),
  );
  return classesAdapter.toClass(createClassDto);
}

async function updateClass(schoolClass: TUpdateClass): Promise<TClass> {
  const updateClassDto = await classesApi.updateClass(
    schoolClass.id,
    classesAdapter.toUpdatePayload(schoolClass),
  );
  return classesAdapter.toClass(updateClassDto);
}

async function deleteClass(classId: string): Promise<void> {
  await classesApi.deleteClass(classId);
}

export const classesService = {
  getClasses,
  createClass,
  updateClass,
  deleteClass,
};
