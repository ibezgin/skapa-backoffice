module.exports = {
    client: {
        service: {
            name: "my-graphql-app",
            url: "http://localhost:8080/graphql",
        },
        includes: ["./src/**/*.graphql", "./src/**/*.gql"],

        excludes: ["**/dist/**/*", "**/*.graphql", "**/node_modules/**/*"],
    },
};
