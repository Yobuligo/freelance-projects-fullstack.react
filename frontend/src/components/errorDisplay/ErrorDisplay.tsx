import { useErrorMessage } from "../../hooks/useErrorMessage";
import { Card } from "../card/Card";

export const ErrorDisplay: React.FC = () => {
  const [errorMessage] = useErrorMessage();
  return <Card>{errorMessage}</Card>;
};
