import { IApplyMessageConfig } from "../../types/IApplyMessageConfig";

export interface IMessageGeneratorConfigProps {
  onApplyMessageConfigChange: (applyMessage: IApplyMessageConfig) => void;
}
