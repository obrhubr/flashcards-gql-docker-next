const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type Query {
        flashcard(id: ID!): Flashcard
        flashcards: [Flashcard!]!
    }
    type Flashcard {
        id: ID!
        name: String!
        text: String!
    }
    type Mutation {
        createFlashcard(name: String!, text: String!): Flashcard!
        updateFlashcard(id: ID!, name: String, text: String): Flashcard!
        deleteFlashcard(id: ID!): Flashcard
    }
`;

exports.typeDefs = typeDefs;