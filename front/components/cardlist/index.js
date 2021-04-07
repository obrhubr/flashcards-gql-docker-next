import React, { useState } from 'react';
import Card from './card';
import { useQuery, gql, useMutation } from "@apollo/client";
import Nav from './Nav.js';
import NavItem from './NavItem.js'

const QUERY_ALLCARDS = gql`
  	query  {
		flashcards {
			id
			name
			text
		}
  	}
`;

export default function CardList () {
	const { data, loading, error } = useQuery(QUERY_ALLCARDS);
	if (loading) {
		return <h2>Loading...</h2>;
	}
	if (error) {
		console.error(error);
		return null;
	}

	return (
		<>
			<div className="bg-white rounded-tl-xl sm:rounded-t-xl lg:rounded-xl shadow-lg divide-y divide-gray-100 m-10">
				<Nav>
					<NavItem href="#" isActive={true}>Cards</NavItem>
				</Nav>
				<div className="divide-y divide-gray-100">
					{data.flashcards.map(x => <Card name={x.name} key={x.id} cardid={x.id} text={x.text}/>)}
				</div>
			</div>
		</>
	)
};