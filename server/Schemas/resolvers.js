//TODO resolvers.js: Define the query and mutation functionality 
//to work with the Mongoose models.

//Hint: Use the functionality in the user - controller.js as a guide.

const { AuthenticationError } = require('apollo-server-express');
const { User, bookSchema } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
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
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, {username, email, password}) => {
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
        saveBook: async (parent, args, context) => {
            if (context.user) {
                console.log(args)
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: args } },
                    { new: true, runValidators: true }
                );
                console.log(updatedUser)
                return updatedUser;
            }
            throw new AuthenticationError('Could not save book')
        },
        deleteBook: async (parent, {bookId}, context) => {
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