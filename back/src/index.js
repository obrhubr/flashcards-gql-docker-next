const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const mongoose = require("mongoose");
const { resolvers } = require("./resolvers");
const { typeDefs } = require("./typeDefs");

const startServer = async () => {
    const app = express();

    const server = new ApolloServer({
        typeDefs,
        resolvers
    });

    server.applyMiddleware({ app });

    console.log(`Connecting to mongodb at url: ${`mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@db:27017/flashcards?authSource=admin`}`);
    await mongoose.connect(`mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@db:27017/flashcards?authSource=admin`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });

    app.listen({ port: 4000 }, () =>
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    );
};

startServer();