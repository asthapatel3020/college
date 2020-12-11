export const authConfig = {
  // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
  identityPoolId: 'ap-southeast-2:362007203038',

  // REQUIRED - Amazon Cognito Region
  region: 'ap-southeast-2',

  // // OPTIONAL - Amazon Cognito Federated Identity Pool Region
  // // Required only if it's different from Amazon Cognito Region
  // identityPoolRegion: 'XX-XXXX-X',

  // OPTIONAL - Amazon Cognito User Pool ID
  userPoolId: 'ap-southeast-2_qrBmMMAMG',

  // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
  userPoolWebClientId: '6t3bem48srp90pvb1ls2ee0ocu',

  // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
  mandatorySignIn: false

  // // OPTIONAL - Configuration for cookie storage
  // // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
  // cookieStorage: {
  //   // REQUIRED - Cookie domain (only required if cookieStorage is provided)
  //   domain: '.yourdomain.com',
  //   // OPTIONAL - Cookie path
  //   path: '/',
  //   // OPTIONAL - Cookie expiration in days
  //   expires: 365,
  //   // OPTIONAL - Cookie secure flag
  //   // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
  //   secure: true
  // },
}
