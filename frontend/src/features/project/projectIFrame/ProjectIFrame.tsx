import { IProjectIFrame } from "./IProjectIFrameProps";

export const ProjectIFrame: React.FC<IProjectIFrame> = (props) => {
  return (
    <iframe
      src={props.userProject.opportunity.url}
      title={props.userProject.opportunity.title}
      width={props.width}
      height={props.height}
    />
  );
};
