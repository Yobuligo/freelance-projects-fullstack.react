import { NumberOfApplicants } from "./types/NumberOfApplicants";

export interface INumberOfApplicantsProps {
  initialValue?: NumberOfApplicants;
  onChange: (applicantNumber: NumberOfApplicants) => void;
}
