import { AbstractRequestContextHelper } from "../../abstract-request-context-helper";

export class PromoCodesContextHelper extends AbstractRequestContextHelper {
    public async getAll(count: number, offset: number) {
        const data = await this.context.helpers.rest.get({
            path: "/promo-code/get-all",
            params: {
                count,
                offset,
            },
        });

        return data;
    }

    public async delete(id: string) {
        return await await this.context.helpers.rest.delete({
            path: `/promo-code/delete/${id}`,
        });
    }

    public async update(
        id: string,
        data: {
            name: string;
            sale: string;
            adminId: string;
            QRCode: string;
        },
    ) {
        return await await this.context.helpers.rest.patch({
            path: `/promo-code/update/${id}`,
            data,
        });
    }
    public async add(data: {
        name: string;
        sale: string;
        adminId: string;
        QRCode: string;
    }) {
        return await await this.context.helpers.rest.post({
            path: "/promo-code/add",
            data: { ...data, QRCodeId: data.QRCode },
        });
    }
}
