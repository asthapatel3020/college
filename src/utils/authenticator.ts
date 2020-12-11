import { CognitoUser } from 'amazon-cognito-identity-js'
import { Auth } from 'aws-amplify'
import { extractCurrentUser } from '../auth'

export const handleCognitoUser = async (user: CognitoUser | null) => {
  if (user) {
    const currentUser = await extractCurrentUser(user)
    return currentUser
  }

  return ''
}

export const currentUserAuthenticator = () => {
  Auth.currentAuthenticatedUser()
    .then(handleCognitoUser)
    .catch((error) => {
      return error
    })
}
