import { useCallback, useEffect, useState } from "react";
import { useSettings } from "../../hooks/useSettings";
import { HourlyRateConfig } from "../HourlyRateConfig/HourlyRateConfig";
import { NumberOfApplicants } from "../numberOfApplicantsConfig/types/NumberOfApplicants";
import { NumberOfApplicantsConfig } from "../numberOfApplicantsConfig/NumberOfApplicantsConfig";
import { ApplicationMediumConfig } from "../applicationMediumConfig/ApplicationMediumConfig";
import { ApplicationMedium } from "../applicationMediumConfig/types/ApplicationMedium";
import { ApplicationOriginConfig } from "../applicationOriginConfig/ApplicationOriginConfig";
import { ApplicationTextConfig } from "../applicationTextConfig/ApplicationTextConfig";
import { AvailabilityConfig } from "../availabilityConfig/AvailabilityConfig";
import { Farewell } from "../farewellConfig/Farewell";
import { FarewellConfig } from "../farewellConfig/FarewellConfig";
import { LanguageConfig } from "../languageConfig/LanguageConfig";
import { Language } from "../languageConfig/types/Language";
import { SalutationConfig } from "../salutationConfig/SalutationConfig";
import { IMessageGeneratorConfigProps } from "./IMessageGeneratorConfigProps";
import { IApplyMessageConfig } from "../../types/IApplyMessageConfig";

export const MessageGeneratorConfig: React.FC<IMessageGeneratorConfigProps> = (
  props
) => {
  const [settings] = useSettings();
  const [applyMessageConfig, setApplyMessageConfig] =
    useState<IApplyMessageConfig>({
      applicantNumber: NumberOfApplicants.SINGLE,
      applicationMedium: ApplicationMedium.WEBSITE,
      applicationOrigin: undefined,
      applicationTexts: [],
      availableFrom: undefined,
      farewell: {
        farewell: Farewell.POLITE,
        name: settings.yourName,
      },
      hourlyRate: undefined,
      language: Language.DE,
      salutation: "",
      telephoneNumber: settings.telephoneNumber,
    });

  const { onApplyMessageConfigChange } = { ...props };

  useEffect(() => {
    onApplyMessageConfigChange(applyMessageConfig);
  }, [applyMessageConfig, onApplyMessageConfigChange]);

  return (
    <>
      {/* <LanguageConfig
        onChange={(language) =>
          setApplyMessageConfig((applyMessage) => ({
            ...applyMessage,
            language,
          }))
        }
        initialValue={applyMessageConfig.language}
      /> */}
      <NumberOfApplicantsConfig
        initialValue={applyMessageConfig.applicantNumber}
        onChange={(applicantNumber) =>
          setApplyMessageConfig((applyMessage) => ({
            ...applyMessage,
            applicantNumber,
          }))
        }
      />
      <SalutationConfig
        onChange={(salutation) =>
          setApplyMessageConfig((applyMessage) => ({
            ...applyMessage,
            salutation,
          }))
        }
      />
      <ApplicationTextConfig
        applicationTexts={settings.applicationTexts}
        onChange={useCallback((applicationTexts: string[]) => {
          setApplyMessageConfig((applyMessage) => ({
            ...applyMessage,
            applicationTexts: applicationTexts,
          }));
        }, [])}
      />
      <ApplicationMediumConfig
        initialValue={applyMessageConfig.applicationMedium}
        onChange={(applicationMedium) =>
          setApplyMessageConfig((applyMessage) => ({
            ...applyMessage,
            applicationMedium,
          }))
        }
      />
      <ApplicationOriginConfig
        onChange={(applicationOrigin) =>
          setApplyMessageConfig((applyMessage) => ({
            ...applyMessage,
            applicationOrigin,
          }))
        }
      />
      <AvailabilityConfig
        initialValue={false}
        onChange={(availableFrom) =>
          setApplyMessageConfig((applyMessage) => ({
            ...applyMessage,
            availableFrom,
          }))
        }
      />
      <HourlyRateConfig
        initialValue={false}
        onChange={(hourlyRate) =>
          setApplyMessageConfig((applyMessage) => ({
            ...applyMessage,
            hourlyRate,
          }))
        }
      />
      <FarewellConfig
        initialFarewell={applyMessageConfig.farewell}
        onChange={(farewell) =>
          setApplyMessageConfig((applyMessage) => ({
            ...applyMessage,
            farewell,
          }))
        }
      />
    </>
  );
};
