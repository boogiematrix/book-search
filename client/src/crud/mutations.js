// TODO mutations.js:

// LOGIN_USER will execute the loginUser mutation set up using Apollo Server.
import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login {
    user {
      _id
      name
      bookCount
      savedBooks
    }
  }
`;
// ADD_USER will execute the addUser mutation.
export const ADD_USER = gql`
  mutation addUser {
    user {
      _id
      name
      email
      password
      bookCount
      savedBooks
    }
  }
`;
// SAVE_BOOK will execute the saveBook mutation.
export const SAVE_BOOK = gql`
  mutation saveBook {
    user {
      bookCount
      savedBooks
    }
  }
`;
// REMOVE_BOOK will execute the removeBook mutation.
export const REMOVE_BOOK = gql`
  mutation deleteBook {
    user {
      bookCount
      savedBooks
    }
  }
`;