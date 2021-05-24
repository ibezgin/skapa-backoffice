import { SubSchema } from "graph/sub-schema";
import schema from "./schema.graphql";

export const dictionaryUsersSubSchema = new SubSchema(schema, {
    Query: {
        users: () => ({}),
    },
    Mutation: {
        users: () => ({}),
    },
    UsersQuery: {
        allUsers: async (_obj, _props, { helpers }) =>
            await helpers.sections.users.allUsers(),
    },
    UsersMutation: {
        addUser: async (_obj, { data }, { helpers }) =>
            await helpers.sections.users.addUser(data),
        deleteUser: async (_obj, { id }, { helpers }) =>
            await helpers.sections.users.deleteUser(id),
        updateUser: async (_obj, { id, data }, { helpers }) =>
            await helpers.sections.users.updateUser(id, data),
    },
});
