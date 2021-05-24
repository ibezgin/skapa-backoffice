import { querySubSchema } from "./query";
import { SubSchema } from "./sub-schema";
import { IResolvers } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
import { mergeResolvers } from "@graphql-tools/merge";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { authenticationSubSchema } from "./auth";
import { dictionaryBrandSubSchema } from "./sections/dictionary/brand";
import { dictionaryCarPartSubSchema } from "./sections/dictionary/car-part";
import { dictionaryModelsSubSchema } from "./sections/dictionary/models";
import { dictionaryServiceSubSchema } from "./sections/dictionary/service";
import { dictionaryUsersSubSchema } from "./sections/dictionary/users";
import { proposalCarsSubSchema } from "./sections/proposal/cars";
import { proposalClientsSubSchema } from "./sections/proposal/clients";
import { proposalSubSchema } from "./sections/proposal/proposal";
import { reportEveryDaySubSchema } from "./sections/report/every-day";
import { reportTurnoverSubSchema } from "./sections/report/turnover";

export const sections: SubSchema[] = [
    dictionaryBrandSubSchema,
    dictionaryModelsSubSchema,
    dictionaryServiceSubSchema,
    dictionaryCarPartSubSchema,
    dictionaryUsersSubSchema,
    proposalClientsSubSchema,
    authenticationSubSchema,
    proposalCarsSubSchema,
    proposalSubSchema,
    reportEveryDaySubSchema,
    reportTurnoverSubSchema,
];

export const schemas: SubSchema[] = [...sections, querySubSchema];

export function buildGraphqlSchema() {
    const resolvers: Array<IResolvers<any, any>> = [];

    const types: any = [];

    for (const objects of schemas) {
        const { resolverMap, typeDefs } = objects;
        resolvers.push(resolverMap as any);
        types.push(typeDefs);
    }

    const schema = makeExecutableSchema({
        typeDefs: mergeTypeDefs(types),
        resolvers: mergeResolvers(resolvers),
    });

    return schema;
}
