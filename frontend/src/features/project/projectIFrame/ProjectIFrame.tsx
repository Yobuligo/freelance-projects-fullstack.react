import { IProjectIFrame } from "./IProjectIFrameProps";

export const ProjectIFrame: React.FC<IProjectIFrame> = (props) => {
  return (
    <iframe
      src={props.userProject.project.url}
      title={props.userProject.project.title}
      width={props.width}
      height={props.height}
    />
  );
};
