import Cardlist from '../components/cardlist';
import Cardform from '../components/cardform';
import { ApolloProvider } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { useEffect } from 'react';

const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
});

export default function Home() {

	useEffect( () => { document.querySelector("body").classList.add("bg-yellow-400") } );

	return (
		<>
			<ApolloProvider client={client}>
				<Cardlist />
				<Cardform />
			</ApolloProvider>
		</>
	)
}