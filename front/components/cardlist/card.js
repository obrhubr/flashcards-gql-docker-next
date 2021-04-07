import React, { Component, useState } from 'react';
import { useQuery, gql, useMutation } from "@apollo/client";

const MUTATION_DELETECARD = gql`
    mutation($id: ID!)  {
        deleteFlashcard(id: $id) {
            id
            name
            text
        }
    }
`;

const MUTATION_UPDATECARD = gql`
    mutation($id: ID!, $name: String!, $text: String!)  {
        updateFlashcard(id: $id, name: $name, text: $text) {
            id
            name
            text
        }
    }
`;

export default function Card ({ name, cardid, text}) {
    const [visibility, setVisibility] = useState("hidden");
    const [deleteCard, { deletedata }] = useMutation(MUTATION_DELETECARD);

    const handleClickVisibility = (event) => {
        setVisibility(visibility == "hidden" ? "visible" : "hidden");
    }

    const [cardname, setName] = useState(name);
    const [cardtext, setText] = useState(text);
    const [updateCard, { updatedata }] = useMutation(MUTATION_UPDATECARD);

    const handleChangeName = (event) => {
        setName(event.target.value);
    }
    const handleChangeText = (event) => {
        setText(event.target.value);
    }

	return (
		<article className="p-4 flex space-x-4">
            <div className="min-w-0 relative flex-auto sm:pr-20 lg:pr-0 xl:pr-20">
                <h2 className="text-lg font-semibold text-black mb-0.5">
                    {name}
                </h2>
                <p>
                    {text}
                </p>
                <br></br>
                <div className="flex ">
                    <div className="flex-initial">
                        <button 
                            onClick={handleClickVisibility}
                            class="hover:bg-blue-200 hover:text-blue-800 group flex items-center rounded-md bg-blue-100 text-blue-600 text-sm font-medium px-4 py-2"
                        >
                            <svg class="group-hover:text-blue-600 text-blue-500 mr-2" width="12" height="20" fill="currentColor">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M6 5a1 1 0 011 1v3h3a1 1 0 110 2H7v3a1 1 0 11-2 0v-3H2a1 1 0 110-2h3V6a1 1 0 011-1z"/>
                            </svg>
                            Edit
                        </button>
                    </div>
                    <div className="flex-initials">
                        <form
                            onSubmit={e => {
                                e.preventDefault();
                                deleteCard({ variables: { id: cardid } });
                            }}
                        >
                            <button class="hover:bg-red-200 hover:text-red-800 group flex items-center rounded-md bg-red-100 text-red-600 text-sm font-medium px-4 py-2 mx-2">
                                <svg class="group-hover:text-red-600 text-red-500 mr-2" width="12" height="20" fill="currentColor">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6 5a1 1 0 011 1v3h3a1 1 0 110 2H7v3a1 1 0 11-2 0v-3H2a1 1 0 110-2h3V6a1 1 0 011-1z"/>
                                </svg>
                                Delete
                            </button>
                        </form>
                    </div>                
                </div>
            </div>
            <div className={visibility}>
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        updateCard({ variables: { id: cardid, name: cardname, text: cardtext } });
                    }}
                >
                    <div className="p-4 flex space-x-4">
                            <div className="min-w-0 relative flex-auto sm:pr-20 lg:pr-0 xl:pr-20">
                                <input
                                    value={cardname}
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
                                    value={cardtext}
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
                                    Update
                                </button>
                            </div>
                    </div>
                </form>
            </div>
        </article>
	)
};