import { createContext } from 'react'
import { CurrentUser, NULL_USER } from './auth'

export const CurrentUserContext = createContext<CurrentUser>(NULL_USER)
