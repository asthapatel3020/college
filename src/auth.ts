import { CognitoUser, CognitoUserAttribute } from 'amazon-cognito-identity-js'

export interface CurrentUser {
  email?: string
  username?: string
  phoneNumber?: string
  role?: string[]
  loggedIn: boolean
  fname?: string
  lname?: string
  campusid?: string[]
  resetPasswordFlag?: string
}

export const NULL_USER = { loggedIn: false }

const findUserAttribute = (attributes: CognitoUserAttribute[]) => (key: string) =>
  // attributes?.find(value => console.log(value.getName()))
  attributes?.find((value) => value.getName() === key)?.getValue()

export const extractCurrentUser = (cognitoUser: CognitoUser) =>
  new Promise<CurrentUser>((resolve, reject) => {
    cognitoUser.getUserAttributes((err?: Error, result?: CognitoUserAttribute[]) => {
      if (err) {
        reject(err)
      } else {
        if (result) {
          const finder = findUserAttribute(result)
          // console.log(finder)
          const email = finder('email')
          const username = finder('username')
          const phoneNumber = finder('phone_number')
          const fname = finder('custom:firstName')
          const lname = finder('custom:lastName')
          const role = finder('custom:role')?.split('|')
          const campusid = finder('custom:campusId')?.split('|')
          const resetPasswordFlag = finder('custom:resetPasswordFlag')
          // const phoneNumber = finder('custom:OrganizationId')
          // const phoneNumber = finder('custom:CampusId')
          resolve({
            loggedIn: true,
            email,
            phoneNumber,
            role,
            fname,
            lname,
            campusid,
            resetPasswordFlag,
            username
          })
        } else {
          reject(new Error('No user attributes'))
        }
      }
    })
  })
