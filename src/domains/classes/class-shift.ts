import { TClassShift } from "./classes-types";

export const CLASS_SHIFT_OPTIONS: TClassShift[] = [
  "morning",
  "afternoon",
  "evening",
];

const CLASS_SHIFT_LABEL: Record<TClassShift, string> = {
  morning: "Manhã",
  afternoon: "Tarde",
  evening: "Noite",
};

const CLASS_SHIFT_BADGE_CLASS: Record<TClassShift, string> = {
  morning: "bg-orange-100",
  afternoon: "bg-primary-light",
  evening: "bg-success-light",
};

const CLASS_SHIFT_TEXT_CLASS: Record<TClassShift, string> = {
  morning: "text-orange-800",
  afternoon: "text-primary",
  evening: "text-success",
};

export function getClassShiftLabel(shift: TClassShift): string {
  return CLASS_SHIFT_LABEL[shift];
}

export function getClassShiftBadgeClassName(shift: TClassShift): string {
  return CLASS_SHIFT_BADGE_CLASS[shift];
}

export function getClassShiftTextClassName(shift: TClassShift): string {
  return CLASS_SHIFT_TEXT_CLASS[shift];
}
