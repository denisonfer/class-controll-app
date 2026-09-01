export type TClassShift = "morning" | "afternoon" | "evening";

export interface IClassDTO {
  class_id: string;
  class_name: string;
  class_shift: TClassShift;
  class_year: number;
  school_id: string;
}

export type TClass = {
  id: string;
  name: string;
  shift: TClassShift;
  year: number;
  schoolId: string;
};

export type TCreateClass = {
  name: string;
  shift: TClassShift;
  year: number;
  schoolId: string;
};

export type TUpdateClass = {
  id: string;
  name: string;
  shift: TClassShift;
  year: number;
};

export type TCreateClassPayload = {
  class_name: string;
  class_shift: TClassShift;
  class_year: number;
  school_id: string;
};

export type TUpdateClassPayload = {
  class_name: string;
  class_shift: TClassShift;
  class_year: number;
};
