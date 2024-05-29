import { texts } from "../../hooks/useTranslation/texts";
import { useTranslation } from "../../hooks/useTranslation/useTranslation";

export const CompletedCard: React.FC = () => {
  const { t } = useTranslation();
  return <>{t(texts.completeCard.completed)}</>;
};
