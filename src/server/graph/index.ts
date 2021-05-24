import { ApolloServer } from "apollo-server-express";
import { RequestContext } from "../request-context";
import { buildGraphqlSchema } from "./sections";

export const schema = buildGraphqlSchema();

export const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => new RequestContext(req, res),
});

// apollo client:codegen --endpoint=http://localhost:8080/graphql --target=typescript --outputFlat --addTypename --includes="src/client/**/*.gql" --excludes="**/*.rest.gql" src/client/gql/types/operation-result-types.ts
