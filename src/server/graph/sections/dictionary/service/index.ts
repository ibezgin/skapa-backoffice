import { SubSchema } from "graph/sub-schema";
import schema from "./schema.graphql";

export const dictionaryServiceSubSchema = new SubSchema(schema, {
    Query: {
        service: () => ({}),
    },
    Mutation: {
        service: () => ({}),
    },
    ServiceQuery: {
        allServices: async (_obj, _props, { helpers }) =>
            await helpers.sections.service.allServices(),
    },
    ServiceMutation: {
        addService: async (_obj, { title, price }, { helpers }) =>
            await helpers.sections.service.addService(title, price),
        deleteService: async (_obj, { id }, { helpers }) =>
            await helpers.sections.service.deleteService(id),
        updateService: async (_obj, { id, title, price }, { helpers }) =>
            await helpers.sections.service.updateService(id, title, price),
    },
});
