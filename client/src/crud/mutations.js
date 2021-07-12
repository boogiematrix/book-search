// TODO mutations.js:

// LOGIN_USER will execute the loginUser mutation set up using Apollo Server.
import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login ($username: String,$email: String!, $password: String!){
    login(username: $username, email: $email, password: $password){
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
  mutation addUser ($username: String!, $email: String!, $password: String!){
    addUser(username: $username, email: $email, password: $password) {
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
  mutation saveBook(   $bookId: String, $authors: [String], $description: String, $title: String,
      $image: String,
      $link: String) {
    saveBook(bookId: $bookId, 
      authors: $authors,
      description: $description,
      title: $title,
      image: $image,
      link: $link) {
            _id
            savedBooks {
              bookId
              title
              authors
            }
    }
  }
`;
// REMOVE_BOOK will execute the removeBook mutation.
export const REMOVE_BOOK = gql`
  mutation deleteBook($bookId: String!) {
    deleteBook(bookId: $bookId) {
      _id
      username
      bookCount
      savedBooks{
        title
        bookId
        authors
      }
    }
  }
`;