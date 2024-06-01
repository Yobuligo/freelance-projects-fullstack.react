import { IProviderMeta } from "../shared/model/IProviderMeta";

class ProviderMetaRepoDefault{
    findAll(): IProviderMeta[]{
        return []
    }
}

export const ProviderMetaRepo = new ProviderMetaRepoDefault()