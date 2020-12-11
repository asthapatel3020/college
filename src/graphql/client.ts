// import ApolloClient from "apollo-boost";
// import { apolloConfig } from '../config/apolloConfig'
// import { ErrorResponse } from 'apollo-link-error'
import { ApolloClient, InMemoryCache, ApolloLink, HttpLink, concat } from '@apollo/client'

// const errorIntercepter = (error: ErrorResponse) => {
//   // Logout when user code is invalid
//   error.graphQLErrors?.map((value) => {
//     if (value.extensions?.code === 'UNAUTHENTICATED') {
//       localStorage.setItem('isErrorAuth', 'true')
//       //   Auth.signOut();
//     }
//   })
// }

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: localStorage.getItem('accessToken') || '',
      correlationId: '123456',
      userId: '123456'
    }
  })

  return forward(operation)
})

const httpLink = new HttpLink({ uri: 'http://localhost:5000/v1/graphql/course' })

export const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache()
})
