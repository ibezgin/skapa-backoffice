import { SubSchema } from "graph/sub-schema";
import schema from "./schema.graphql";

export const dictionaryModelsSubSchema = new SubSchema(schema, {
    Query: {
        models: () => ({}),
    },
    Mutation: {
        models: () => ({}),
    },
    ModelsQuery: {
        allModels: async (_obj, _props, { helpers }) =>
            await helpers.sections.models.allModels(),
    },
    ModelsMutation: {
        addModel: async (_obj, { brandId, title }, { helpers }) =>
            await helpers.sections.models.addModel(brandId, title),
        deleteModel: async (_obj, { id }, { helpers }) =>
            await helpers.sections.models.deleteModel(id),
        updateModel: async (_obj, { id, title, brandId }, { helpers }) =>
            await helpers.sections.models.updateModel(id, brandId, title),
    },
});
