import { Card } from "../../components/Card";
import { IProjectProps } from "./IProjectProps";

export const Project: React.FC<IProjectProps> = (props) => {
  return (
    <Card>
      {props.project.company}
      {props.project.title}
      {props.project.location}
      {props.project.createdAt.toString()}
    </Card>
  );
};
