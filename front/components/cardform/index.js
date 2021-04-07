import React, { useState } from 'react';
import { useQuery, gql, useMutation } from "@apollo/client";
import Nav from './Nav.js';
import NavItem from './NavItem.js'

const MUTATION_ADDCARD = gql`
    mutation CreateFlashCard($name: String!, $text: String!)  {
        createFlashcard(name: $name, text: $text) {
            id
            name
            text
        }
    }
`;

export default function CardForm () {
    const [name, setName] = useState("");
    const [text, setText] = useState("");

    const handleChangeName = (event) => {
        setName(event.target.value);
    }
    const handleChangeText = (event) => {
        setText(event.target.value);
    }

    const [addCard, { data }] = useMutation(MUTATION_ADDCARD);
    
	return (
		<>
			<div className="bg-white rounded-tl-xl sm:rounded-t-xl lg:rounded-xl shadow-lg divide-y divide-gray-100 m-10">
				<div className="divide-y divide-gray-100 space-x-4">
                    <Nav>
                        <NavItem href="#" isActive={true}>New Card</NavItem>
                    </Nav>
                    <form
                        onSubmit={e => {
                            e.preventDefault();
                            addCard({ variables: { name: name, text: text } });
                        }}
                    >
                        <div className="p-4 flex space-x-4">
                            <div className="min-w-0 relative flex-auto sm:pr-20 lg:pr-0 xl:pr-20">
                                <input
                                    value={name}
                                    onChange={handleChangeName}
                                    className="focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 pl-10"
                                    type="text" 
                                    aria-label="Name" 
                                    placeholder="Name" 
                                />
                            </div>
                        </div>
                        <div className="p-4 flex space-x-4">
                            <div className="min-w-0 relative flex-auto sm:pr-20 lg:pr-0 xl:pr-20">
                                <textarea
                                    value={text}
                                    onChange={handleChangeText}
                                    className="resize-y focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 pl-10">
                                </textarea>
                            </div>
                        </div>
                        <div className="p-4 flex space-x-4">
                            <div className="min-w-0 relative flex-auto sm:pr-20 lg:pr-0 xl:pr-20">
                                <button type="submit" class="hover:bg-blue-200 hover:text-blue-800 group flex items-center rounded-md bg-blue-100 text-blue-600 text-sm font-medium px-4 py-2">
                                    <svg class="group-hover:text-blue-600 text-blue-500 mr-2" width="12" height="20" fill="currentColor">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6 5a1 1 0 011 1v3h3a1 1 0 110 2H7v3a1 1 0 11-2 0v-3H2a1 1 0 110-2h3V6a1 1 0 011-1z"/>
                                    </svg>
                                    Add Card
                                </button>
                            </div>
                        </div>
                    </form>
				</div> 
			</div>
		</>
	)
};