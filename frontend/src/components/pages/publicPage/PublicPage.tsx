import { ErrorDisplay } from "../../errorDisplay/ErrorDisplay";
import { Page } from "../page/Page";
import { IPublicPageProps } from "./IPublicPageProps";
import styles from "./PublicPage.module.scss";

export const PublicPage: React.FC<IPublicPageProps> = (props) => {
  return (
    <Page>
      {props.displayErrorDisplay === undefined ||
        (props.displayErrorDisplay === true && (
          <ErrorDisplay className={styles.errorDisplay} />
        ))}
      {props.children}
    </Page>
  );
};
