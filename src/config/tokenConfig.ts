const authConfig = {
  url: `https://danford-dev.auth.ap-southeast-2.amazoncognito.com/oauth2/token`,
  authorization: `Basic Mmxjb3Y4MjUxampsOGFnM3NoN2E5a2lqODk6NGRwNHZtMDV1amh2bGE0OXUzM2hpaTVidXQyYTFlZDhxZnM0YWVrcmQxdXZudGhmZHBv`,
  contentType: `application/x-www-form-urlencoded`,
  scope: `https://danford-dev.solvitude.com.au/course.read https://danford-dev.solvitude.com.au/organisation.read https://danford-dev.solvitude.com.au/graphql.course.read https://danford-dev.solvitude.com.au/graphql.student.read https://danford-dev.solvitude.com.au/graphql.organisation.read https://danford-dev.solvitude.com.au/student.read https://danford-dev.solvitude.com.au/course.write https://danford-dev.solvitude.com.au/organisation.write https://danford-dev.solvitude.com.au/student.write`,
  grantType: `client_credentials`
}

export default authConfig
