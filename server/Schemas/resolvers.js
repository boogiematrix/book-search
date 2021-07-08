//TODO resolvers.js: Define the query and mutation functionality 
//to work with the Mongoose models.

//Hint: Use the functionality in the user - controller.js as a guide.

const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find();
        },
        // get a single user by either their id or their username
        user: async (parent, { userId, name }) => {
            const foundUser = await User.findOne({
                $or: [{ _id: userId }, { username: name }],
            });

            if (!foundUser) {
                throw new AuthenticationError('Cannot find a user with this id!');
            }
            return foundUser
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return Profile.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError('You need to be logged in!');
        }
    },

    Mutation: {
        addUser: async (parent, { name, email, password }) => {
            const user = await User.create({ name, email, password });
            const token = signToken(user);

            return { token, user };
        },
        login: async () => {

        },
        saveBook: async () => {

        },
        deleteBook: async () => {
            
        }
    }
}

// create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)

// login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
// {body} is destructured req.body

// save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
// user comes from `req.user` created in the auth middleware function

// remove a book from `savedBooks