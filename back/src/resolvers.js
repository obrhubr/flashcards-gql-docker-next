const { Flashcard } = require("./models/Flashcard");

const resolvers = {
    Query: {
        flashcard: (_, { id }) => {
            const card = Flashcard.findById(id);
            return card;
        },
        flashcards: () => Flashcard.find({})
    },
    Mutation: {
        createFlashcard: async (_, { name, text }) => {
            let card = new Flashcard({ name, text });
            await card.save();
            return card;
        },
        updateFlashcard: async (_, { id, name, text }) => {
            var updatedFlashcard = {}
            if (name !== undefined) {
                updatedFlashcard.name = name;
            };
            if (text !== undefined) {
                updatedFlashcard.text = text;
            };
            let card = Flashcard.findByIdAndUpdate(id, updatedFlashcard, {new: true});
            return card;
        },
        deleteFlashcard: async (_, { id }) => {
            let card = Flashcard.findByIdAndRemove(id);
            return card;
        }
    }
};

exports.resolvers = resolvers;