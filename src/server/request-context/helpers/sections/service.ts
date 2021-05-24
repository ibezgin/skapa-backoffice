import { AbstractRequestContextHelper } from "../../abstract-request-context-helper";
import { ServiceModel, IService } from "../../../db/entities/service";

export class ServiceContextHelper extends AbstractRequestContextHelper {
    public async allServices() {
        return await this.context.helpers.database.getAll<IService>(
            ServiceModel,
        );
    }

    public async addService(title: string, price: number) {
        return await this.context.helpers.database.add<IService>(ServiceModel, {
            title,
            price,
        });
    }

    public async deleteService(id: string) {
        return await this.context.helpers.database.delete<IService>(
            ServiceModel,
            id,
        );
    }

    public async updateService(id: string, title: string, price: number) {
        return await this.context.helpers.database.update<IService>(
            ServiceModel,
            id,
            {
                id,
                title,
                price,
            },
        );
    }
}
