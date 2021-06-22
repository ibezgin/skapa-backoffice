import { SubSchema } from "graph/sub-schema";
import schema from "./schema.graphql";

export const promoCodesSubSchema = new SubSchema(schema, {
    Query: {
        promoCodes: (_obj, _params, { authentification }) => {
            if (authentification.isAuthenticated()) {
                return {};
            } else {
                throw new Error("permission denied");
            }
        },
    },
    Mutation: {
        promoCodes: (_obj, _params, { authentification }) => {
            if (authentification.isAuthenticated()) {
                return {};
            } else {
                throw new Error("permission denied");
            }
        },
    },
    PromoCodesQuery: {
        all: async (_obj, { count, offset }, { helpers }) =>
            await helpers.sections.promocodes.getAll(count, offset),
    },
    PromoCodesMutation: {
        add: async (_obj, { data }, { helpers }) =>
            await helpers.sections.promocodes.add(data),
        delete: async (_obj, { id }, { helpers }) =>
            await helpers.sections.promocodes.delete(id),
        update: async (_obj, { id, data }, { helpers }) =>
            await helpers.sections.promocodes.update(id, data),
        addMany: async (_obj, { data }, { helpers }) =>
            await helpers.sections.promocodes.addMany(data),
    },
});
