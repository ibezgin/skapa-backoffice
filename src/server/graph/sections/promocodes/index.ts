import { SubSchema } from "graph/sub-schema";
import schema from "./schema.graphql";

export const promoCodesSubSchema = new SubSchema(schema, {
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
        add: async (_obj, { data }, { helpers }) =>
            await helpers.sections.promocodes.add(data),
    },
});
