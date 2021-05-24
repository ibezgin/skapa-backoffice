import { AbstractRequestContextHelper } from "../../abstract-request-context-helper";
import { IModels, ModelsModel } from "../../../db/entities/models";

export class ModelsContextHelper extends AbstractRequestContextHelper {
    public async allModels() {
        return await this.context.helpers.database.getAll<IModels>(ModelsModel);
    }

    public async addModel(brandId: string, title: string) {
        return await this.context.helpers.database.add<IModels>(ModelsModel, {
            brandId,
            title,
        });
    }
    public async deleteModel(id: string) {
        return await this.context.helpers.database.delete<IModels>(
            ModelsModel,
            id,
        );
    }
    public async updateModel(id: string, brandId: string, title: string) {
        return await this.context.helpers.database.update<IModels>(
            ModelsModel,
            id,
            {
                id,
                title,
                brandId,
            },
        );
    }
}
