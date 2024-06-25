import { Provider } from "../decorators/Provider";
import { IProject } from "../shared/model/IProject";
import { ProviderType } from "../shared/types/ProviderType";
import { IProvider } from "./core/IProvider";

@Provider(ProviderType.ComputerFutures, "Computer Futures")
export class ComputerFutures implements IProvider {
  request(url: string): Promise<IProject[]> {
    return new Promise(async (resolve, reject) => {
      resolve([]);
    });
  }
}
