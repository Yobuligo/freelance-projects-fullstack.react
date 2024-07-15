import { IPageProps } from "./IPageProps";

export const Page: React.FC<IPageProps> = (props) => {
  return <>{props.children}</>;
};
