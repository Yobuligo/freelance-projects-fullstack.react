import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import { AppContext } from "./context/AppContext";
import { useSessionStorage } from "./hooks/useSessionStorage";
import { useUserConfigStorage } from "./hooks/useUserConfigStorage";
import "./index.scss";
import { AppRouter } from "./routes/AppRouter";
import { IUserOpportunity } from "./shared/model/IUserOpportunity";
import { IUserProviderRequest } from "./shared/model/IUserProviderRequest";
import { ReactComponent as BackgroundShapes } from "./assets/backgroundShapes.svg";

export const App: React.FC = () => {
  return (
    <>
      <div className="backgroundShapes">
        <BackgroundShapes />
      </div>
      <AppContext.Provider
        value={{
          errorMessage: useState(""),
          userOpportunities: useState<IUserOpportunity[]>([]),
          session: useSessionStorage(),
          userConfig: useUserConfigStorage(),
          userProviderRequests: useState<IUserProviderRequest[]>([]),
        }}
      >
        <RouterProvider router={AppRouter} />
      </AppContext.Provider>
    </>
  );
};
