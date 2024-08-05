import { IOpportunityIFrame } from "./IOpportunityIFrameProps";

export const OpportunityIFrame: React.FC<IOpportunityIFrame> = (props) => {
  return (
    <iframe
      src={props.userOpportunity.opportunity.url}
      title={props.userOpportunity.opportunity.title}
      width={props.width}
      height={props.height}
    />
  );
};
