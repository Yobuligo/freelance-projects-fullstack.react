import { ApplicationMedium } from "../features/applicationMediumConfig/types/ApplicationMedium";
import { IApplicationOrigin } from "../features/applicationOriginConfig/types/IApplicationOrigin";
import { IFarewell } from "../features/farewellConfig/IFarewell";
import { Language } from "../features/languageConfig/types/Language";
import { NumberOfApplicants } from "../features/numberOfApplicantsConfig/types/NumberOfApplicants";

export interface IApplyMessageConfig {
  applicantNumber: NumberOfApplicants;
  applicationMedium: ApplicationMedium;
  applicationOrigin: IApplicationOrigin | undefined;
  applicationTexts: string[];
  availableFrom: string | undefined;
  farewell: IFarewell;
  hourlyRate: string | undefined;
  language: Language;
  salutation: string;
  telephoneNumber: string;
}
