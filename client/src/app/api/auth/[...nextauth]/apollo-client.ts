import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

let client: ApolloClient<any> | null = null;

export const getClient = () => {
    // Create new client if there is no existing one
    // or if we are running on server
    if (!client || typeof window === "undefined") {
        client = new ApolloClient({
            link: new HttpLink({
                uri: `http://localhost:3000/graphql`,
            }),
            cache: new InMemoryCache(),
        });
    }

    return client;
};
