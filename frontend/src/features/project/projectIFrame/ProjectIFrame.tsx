import { IProjectIFrame } from "./IProjectIFrameProps";

export const ProjectIFrame: React.FC<IProjectIFrame> = (props) => {
  return (
    <iframe
      src={props.project.url}
      title={props.project.title}
      width={props.width}
      height={props.height}
    />
  );
};
