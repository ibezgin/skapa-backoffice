import { SubSchema } from "graph/sub-schema";
import schema from "./schema.graphql";

export const usersSubSchema = new SubSchema(schema, {
    Query: {
        promoCodes: () => ({}),
    },
    Mutation: {
        promoCodes: () => ({}),
    },
    PromoCodesQuery: {
        all: async (_obj, { count, offset }, { helpers }) =>
            await helpers.sections.promocodes.getAll(count, offset),
    },
    PromoCodesMutation: {
        add: async (_obj, { name, sale, adminId, QRCode }, { helpers }) =>
            await helpers.sections.promocodes.add({
                name,
                sale,
                adminId,
                QRCode,
            }),
    },
});
