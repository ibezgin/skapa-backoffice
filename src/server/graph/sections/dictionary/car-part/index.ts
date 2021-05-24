import { SubSchema } from "graph/sub-schema";
import schema from "./schema.graphql";

export const dictionaryCarPartSubSchema = new SubSchema(schema, {
    Query: {
        carPart: () => ({}),
    },
    Mutation: {
        carPart: () => ({}),
    },
    CarPartQuery: {
        allCarParts: async (_obj, _props, { helpers }) =>
            await helpers.sections.carPart.allCarParts(),
    },
    CarPartMutation: {
        addCarPart: async (_obj, { title, price }, { helpers }) =>
            await helpers.sections.carPart.addCarPart(title, price),
        deleteCarPart: async (_obj, { id }, { helpers }) =>
            await helpers.sections.carPart.deleteCarPart(id),
        updateCarPart: async (_obj, { id, title, price }, { helpers }) =>
            await helpers.sections.carPart.updateCarPart(id, title, price),
    },
});
