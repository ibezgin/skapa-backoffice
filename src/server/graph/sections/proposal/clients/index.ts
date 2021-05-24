import { SubSchema } from "graph/sub-schema";
import schema from "./schema.graphql";

export const proposalClientsSubSchema = new SubSchema(schema, {
    Query: {
        clients: () => ({}),
    },
    Mutation: {
        clients: () => ({}),
    },
    ClientsQuery: {
        allClients: async (_obj, _props, { helpers }) =>
            await helpers.sections.clients.allClients(),
    },
    ClientsMutation: {
        addClient: async (_obj, { data }, { helpers }) =>
            await helpers.sections.clients.addClient(data),
        deleteClient: async (_obj, { id }, { helpers }) =>
            await helpers.sections.clients.deleteClient(id),
        updateClient: async (_obj, { id, data }, { helpers }) =>
            await helpers.sections.clients.updateClient(id, data),
    },
});
