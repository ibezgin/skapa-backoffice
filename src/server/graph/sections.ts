import { querySubSchema } from "./query";
import { SubSchema } from "./sub-schema";
import { IResolvers } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
import { mergeResolvers } from "@graphql-tools/merge";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { authenticationSubSchema } from "./auth";
import { usersSubSchema } from "./sections/users";

export const sections: SubSchema[] = [usersSubSchema, authenticationSubSchema];

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
