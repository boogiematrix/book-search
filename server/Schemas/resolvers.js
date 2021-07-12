const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        //get current users information
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('savedBooks');
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        users: async () => {
      return User.find().populate('savedBooks');
    },

    },

    Mutation: {
        //signin function creates token and returns it with user data
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            
            const token = signToken(user);

            return { token, user };
        },
        //logs user in, creates and returns token with user data
        login: async (parent, { username, email, password }) => {
            const user = await User.findOne({ $or: [{ username: username }, { email: email }] });
            if (!user) {
                throw new AuthenticationError("Can't find this user");
            }

            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Wrong password!' );
            }
            const token = signToken(user);

            return {token, user}
        },
        //args contains book data, is added to savedBooks in users data
        saveBook: async (parent, args, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: args } },
                    { new: true, runValidators: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError('Could not save book')
        },
        //removes a book's data from savedBooks
        deleteBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId: bookId } } },
                    { new: true }
                );
                return updatedUser
            }
            throw new AuthenticationError('Could not delete book')
        }
    }
}

module.exports = resolvers