import { PublicPage } from "../components/pages/publicPage/PublicPage";
import MessageGeneratorApp from "../lib/applyMessageGenerator/MessageGeneratorApp";

export const MessageGeneratorPage: React.FC = () => {
  return (
    <PublicPage>
      <MessageGeneratorApp />
    </PublicPage>
  );
};
