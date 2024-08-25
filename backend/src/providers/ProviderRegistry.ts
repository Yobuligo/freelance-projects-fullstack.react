import { ComputerFutures } from "./ComputerFutures";
import { DasAuge } from "./DasAuge";
import { Freelance } from "./Freelance";
import { FreelancerMap } from "./FreelancerMap";
import { ProviderClassType } from "./core/ProviderClassType";

export const ProviderRegistry: ProviderClassType[] = [
  ComputerFutures,
  FreelancerMap,
  Freelance,
  DasAuge,
];
