import React, { useEffect, useState } from 'react'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import { ApolloProvider } from '@apollo/react-hooks'
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom'
import './App.css'
import { Main } from './components/Main'
import { client } from './graphql/client'
import { CurrentUserContext } from './contexts'
import { Login } from './pages/Login'
import { CurrentUser, extractCurrentUser, NULL_USER } from './auth'
import Amplify, { Auth } from 'aws-amplify'
import { CognitoUser } from 'amazon-cognito-identity-js'
import { authConfig } from './config/authConfig'
import { ForgotPassword } from './pages/ForgotPassword/ForgotPassword'
import { ResetPassword } from './pages/ResetPassword/ResetPassword'
import CreateUser from './pages/CreateUser'
import configFile from './config/tokenConfig'
import axios from 'axios'
import { NewPassword } from './pages/Login/NewPassword'

Amplify.configure({
  Auth: authConfig
})

export const AppContainer = () => {
  const [currentUser, setCurrentUser] = useState<CurrentUser>(NULL_USER)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isLoading, setLoading] = useState<boolean>(false)
  const history = useHistory()

  const handleCognitoUser = async (user: CognitoUser | null) => {
    try {
      if (localStorage.getItem('isAuth') === 'true') {
        setCurrentUser({ loggedIn: true })
      }
      if (user) {
        setLoading(false)
        const currentUser = await extractCurrentUser(user)
        if (currentUser.resetPasswordFlag && currentUser.resetPasswordFlag === 'true') {
          history.push('./newpassword')
          setCurrentUser({ loggedIn: true })
          setCurrentUser(currentUser)
          localStorage.setItem('isAuth', 'true')
        } else {
          if ((currentUser.campusid && currentUser.campusid.length === 0) || localStorage.getItem('campusID')) {
            setCurrentUser({ loggedIn: true })
            setCurrentUser(currentUser)
            history.push('./unitization')
          } else {
            setCurrentUser({ loggedIn: true })
            setCurrentUser(currentUser)
            history.push('./campus')
          }

          // history.push('./')
        }
      } else {
        setCurrentUser(NULL_USER)
      }
      setErrorMessage(null)
    } catch (error) {
      localStorage.setItem('isAuth', 'false')
      setCurrentUser(NULL_USER)
      setErrorMessage('Email not found or not active')
    }
    setLoading(false)
  }

  const handleError = (error: Error) => {
    error && setErrorMessage(error.message)
    setLoading(false)
  }

  const signIn = (username: string, password: string) => {
    const emptyField = !username.trim() ? 'Email' : !password.trim() ? 'Password' : ''
    if (!emptyField) {
      setLoading(true)
      Auth.signIn({ username, password })
        .then((user) => {
          localStorage.setItem('fpassword', password)
          handleCognitoUser(user)
        })
        .catch(handleError)
    } else {
      setErrorMessage(`${emptyField} cannot be empty`)
    }
  }

  useEffect(() => {
    if (!window.location.hash) {
      Auth.currentAuthenticatedUser()
        .then(handleCognitoUser)
        .catch(() => {
          setLoading(false)
          setErrorMessage(null) //When No Current User, we don't show the error
          const isErrorAuth = localStorage.getItem('isErrorAuth') === 'true'
          if (isErrorAuth) {
            setErrorMessage('Email not found or not active')
            localStorage.setItem('isErrorAuth', 'false')
          }
        })
    }

    const body = new URLSearchParams()
    body.set('grant_type', configFile.grantType)
    body.set('scope', configFile.scope)
    axios
      .post(configFile.url, body.toString(), {
        headers: {
          Authorization: configFile.authorization,
          'Content-Type': configFile.contentType
        }
      })
      .then((response) => {
        localStorage.setItem('accessToken', response.data.access_token)
      })
    // eslint-disable-next-line
  }, []);

  const signOut = () => {
    setLoading(true)
    Auth.signOut()
      .then(() => {
        history.push('/')
        localStorage.clear()
        handleCognitoUser(null)
      })
      .catch(() => {
        setLoading(false)
        setErrorMessage(null)
      })
  }

  const completeNewPassword = (username: string, newPassword: string) => {
    console.log(username)
    const fpswd = localStorage.getItem('fpassword')
    Auth.currentAuthenticatedUser()
      .then((user) => {
        console.log(user)
        console.log(fpswd)
        Auth.changePassword(user, fpswd ? fpswd : '', newPassword).then(() => {
          Auth.updateUserAttributes(user, {
            'custom:resetPasswordFlag': 'false'
          }).then((asuser) => {
            if (asuser) handleCognitoUser(user)
          })
        })
      })
      .catch(() => {
        console.log('Error')
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <Route path="/createUser" component={CreateUser} />
        {/* <Main/> */}
        {currentUser.loggedIn ? (
          <>
            <Main {...{ signOut }} />
            <Route
              path="/newpassword"
              render={() => <NewPassword {...{ completeNewPassword, isLoading }}></NewPassword>}
            />
          </>
        ) : (
          <>
            <Route path="/" render={() => <Login {...{ errorMessage, signIn, isLoading }} />} />
            <Route path="/forgotpassword" component={ForgotPassword} />
            <Route path="/resetpassword" component={ResetPassword} />
          </>
        )}
      </Switch>
    </CurrentUserContext.Provider>
  )
}

export const App = () => (
  <GoogleReCaptchaProvider
    reCaptchaKey="6Lebg-wZAAAAAO5YZCnm8qJCT1nF4-otZfRDX-r7"
    useRecaptchaNet={true}
    scriptProps={{
      async: false, // optional, default to false,
      defer: false, // optional, default to false
      appendTo: 'head', // optional, default to "head", can be "head" or "body",
      nonce: undefined // optional, default undefined
    }}
  >
    <Router>
      <ApolloProvider client={client}>
        <AppContainer />
      </ApolloProvider>
    </Router>
  </GoogleReCaptchaProvider>
)

export default App
