import { SubSchema } from "../sub-schema";

import { gql } from "apollo-server-express";

const types = gql`
    scalar JSON
    scalar JSONObject
    scalar Date

    type Query {
        _keep: Boolean
    }

    type Mutation {
        _keep: Boolean
    }

    schema {
        query: Query
        mutation: Mutation
    }
`;

export const querySubSchema = new SubSchema(types, {
    Query: {},
    Mutation: {},
});
