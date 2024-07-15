import { Page } from "../page/Page";
import { IProtectedPageProps } from "./IProtectedPageProps";

export const ProtectedPage: React.FC<IProtectedPageProps> = (props) => {
  return <Page>{props.children}</Page>;
};
