import { SubSchema } from "../sub-schema";

import { gql } from "apollo-server-express";

const types = gql`
    extend type Query {
        authentication: AuthenticationQuery!
    }
    extend type Mutation {
        authentication: AuthenticationMutation!
    }
    type AuthenticationQuery {
        currentUser: LoginType
    }
    type AuthenticationMutation {
        login(username: String, password: String): LoginType
        logout: Boolean
    }

    type LoginType {
        id: String
        username: String
        permission: JSON
        position: String
    }
    input LoginInput {
        username: String
        password: String
    }
`;

export const authenticationSubSchema = new SubSchema(types, {
    Query: {
        authentication: () => ({}),
    },
    Mutation: {
        authentication: () => ({}),
    },
    AuthenticationQuery: {
        currentUser: async (_obj, _params, context) => {
            return await context.authentification.getUser();
        },
    },

    AuthenticationMutation: {
        login: async (_obj, { username, password }, context) => {
            const { user } = await context.authentification.authenticate(
                "graphql-local",
                {
                    username,
                    password,
                },
            );
            await context.authentification.login(user);

            return user;
        },
        logout: async (_obj, _params, context) => {
            context.request.session.destroy(error => {
                if (error) {
                    // eslint-disable-next-line no-console
                    console.log(error);
                }
            });

            context.authentification.logout();
        },
    },
});
