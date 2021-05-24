import { SubSchema } from "graph/sub-schema";
import schema from "./schema.graphql";

export const dictionaryBrandSubSchema = new SubSchema(schema, {
    Query: {
        brand: () => ({}),
    },
    Mutation: {
        brand: () => ({}),
    },
    BrandQuery: {
        allBrands: async (_obj, _props, { helpers }) =>
            await helpers.sections.brand.allBrands(),
    },
    BrandMutation: {
        addBrand: async (_obj, { title }, { helpers }) =>
            await helpers.sections.brand.addBrand(title),
        deleteBrand: async (_obj, { id }, { helpers }) =>
            await helpers.sections.brand.deleteBrand(id),
        updateBrand: async (_obj, { id, title }, { helpers }) =>
            await helpers.sections.brand.updateBrand(id, title),
    },
});
