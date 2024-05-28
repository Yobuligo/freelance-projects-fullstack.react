import { IProject } from "../../shared/model/IProject";

/**
 * Represents a Provider to request projects from (e.g. FreelancerMap)
 */
export interface IProvider {
  request(url: string): Promise<IProject[]>;
}
