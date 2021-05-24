import { AbstractRequestContextHelper } from "../../abstract-request-context-helper";
import { IClients, ClientsModel } from "../../../db/entities/clients";
import { ClientInput } from "gql/types/operation-result-types";
export class ClientsContextHelper extends AbstractRequestContextHelper {
    public async allClients() {
        return (
            await this.context.helpers.database.getAll<IClients>(ClientsModel)
        ).sort((a, b) => Number(b.createTime) - Number(a.createTime));
    }

    public async addClient(data: ClientInput) {
        return await this.context.helpers.database.add<IClients>(
            ClientsModel,
            data,
        );
    }

    public async deleteClient(id: string) {
        return await this.context.helpers.database.delete<IClients>(
            ClientsModel,
            id,
        );
    }

    public async updateClient(id: string, data: any) {
        return await this.context.helpers.database.update<IClients>(
            ClientsModel,
            id,
            { ...data, id },
        );
    }
}
