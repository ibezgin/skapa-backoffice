import { SubSchema } from "graph/sub-schema";
import schema from "./schema.graphql";

export const proposalCarsSubSchema = new SubSchema(schema, {
    Query: {
        cars: () => ({}),
    },
    Mutation: {
        cars: () => ({}),
    },
    CarsQuery: {
        allCars: async (_obj, _props, { helpers }) =>
            await helpers.sections.cars.allCars(),
    },
    CarsMutation: {
        addCar: async (_obj, { data }, { helpers }) =>
            await helpers.sections.cars.addCar(data),
        deleteCar: async (_obj, { id }, { helpers }) =>
            await helpers.sections.cars.deleteCar(id),
        updateCar: async (_obj, { id, data }, { helpers }) =>
            await helpers.sections.cars.updateCar(id, data),
    },
});
