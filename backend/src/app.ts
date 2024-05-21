import { ProjectCollector } from "./services/projectCollector/ProjectCollector";
import { ProviderType } from "./shared/types/ProviderType";

const collect = async () => {
  const projectCollector = new ProjectCollector();
  const projects = await projectCollector.collect([
    {
      providerType: ProviderType.FreelancerMap,
      urls: [
        "https://www.freelancermap.de/projektboerse.html?categories%5B0%5D=1&created=1&projectContractTypes%5B0%5D=contracting&remoteInPercent%5B0%5D=100&remoteInPercent%5B1%5D=1&query=Java&countries%5B%5D=1&sort=1&pagenr=1",
      ],
    },
  ]);

  projects.forEach((project) =>
    console.log(`Project: ${project.title} from ${project.company}`)
  );
};

collect();
