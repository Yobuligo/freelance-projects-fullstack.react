import MarkdownComp from "react-markdown";
import remarkGfm from "remark-gfm";
import { IMarkdownProps } from "./IMarkdownProps";

export const Markdown: React.FC<IMarkdownProps> = (props) => (
  <MarkdownComp remarkPlugins={[remarkGfm]}>{props.markdownText}</MarkdownComp>
);
