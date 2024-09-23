import { NotSupportedError } from "../shared/errors/NotSupportedError";
import { TimeUnit } from "../types/TimeUnit";
import { texts } from "./useTranslation/texts";
import { useTranslation } from "./useTranslation/useTranslation";

export const useRenderTimeUnit = () => {
  const { t } = useTranslation();

  const render = (timeUnit: TimeUnit): string => {
    switch (timeUnit) {
      case TimeUnit.DAYS:
        return t(texts.general.timeUnit.days);
      case TimeUnit.HOURS:
        return t(texts.general.timeUnit.hours);
      case TimeUnit.WORKING_DAYS:
        return t(texts.general.timeUnit.workingDays);
      default:
        throw new NotSupportedError();
    }
  };

  return render;
};
