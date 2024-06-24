import styles from "../../styles/icon.module.scss";

export const Icon: React.FC<{
  SVG: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}> = ({ SVG, ...props }) => {
  return <SVG className={styles.icon} {...props} />;
};
