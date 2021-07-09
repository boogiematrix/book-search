// TODO mutations.js:

// LOGIN_USER will execute the loginUser mutation set up using Apollo Server.
import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login ($email: String!, $password: String!){
    login(email: $email, password: $password){
        token
        user {
        _id
        username
        }
    }
  }
`;
// ADD_USER will execute the addUser mutation.
export const ADD_USER = gql`
  mutation addUser ($email: String!, $username: String!, $password: String!){
    addUser(email: $email, username: $username, password: $password) {
        token
        user {
        _id
        username
        }
    }
  }
`;
// SAVE_BOOK will execute the saveBook mutation.
export const SAVE_BOOK = gql`
  mutation saveBook($BookInput: inp) {
    saveBook(BookInput: $BookInput) {
        token
        user {
            _id
            username
            bookCount
            savedBooks
        }
    }
  }
`;
// REMOVE_BOOK will execute the removeBook mutation.
export const REMOVE_BOOK = gql`
  mutation deleteBook($bookId: String!) {
    deleteBook(bookId: $bookId) {
     token
     user{
      _id
      username
      savedBooks
     }
    }
  }
`;