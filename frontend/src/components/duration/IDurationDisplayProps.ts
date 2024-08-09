import { Duration } from "../../core/services/date/Duration";

export interface IDurationDisplayProps {
  classNameDuration?: string;
  classNameTitle?: string;
  duration: Duration;
  title: string;
}
