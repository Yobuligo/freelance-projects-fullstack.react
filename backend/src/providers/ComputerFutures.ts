import { Provider } from "../decorators/Provider";
import { IOpportunity } from "../shared/model/IOpportunity";
import { ProviderType } from "../shared/types/ProviderType";
import { IProvider } from "./core/IProvider";

@Provider(ProviderType.ComputerFutures, "Computer Futures")
export class ComputerFutures implements IProvider {
  request(url: string): Promise<IOpportunity[]> {
    return new Promise(async (resolve, reject) => {
      resolve([]);
    });
  }
}
