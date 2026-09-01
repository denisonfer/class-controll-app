import { IClassDTO } from "../classes/classes-types";

export interface ISchoolDTO {
  school_id: string;
  school_name: string;
  school_address: string;
  school_classes: IClassDTO[];
}

export type TSchool = {
  id: string;
  name: string;
  address: string;
  classesCount: number;
};

export type TCreateSchool = {
  name: string;
  address: string;
};

export type TUpdateSchool = {
  id: string;
} & TCreateSchool;

export type TCreateSchoolPayload = {
  school_name: string;
  school_address: string;
};

export type TUpdateSchoolPayload = TCreateSchoolPayload;
