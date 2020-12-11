import React, { useContext } from 'react'
import { Route } from 'react-router-dom'
import { Container } from './common/Container'
import Unitization from '../pages/Unitization'
import { AccountSettings } from '../pages/AccountSetting'
import { SelectCampus } from '../pages/SelectCampus'
import { CurrentUserContext } from '../contexts'

export const Content = () => {
  const currentUser = useContext(CurrentUserContext)

  return (
    <Container>
      <Route path="/accountSettings" component={AccountSettings} />
      <Route
        path="/campus"
        render={() => <SelectCampus campusId={currentUser.campusid ? currentUser.campusid : []} />}
      />
      <Route path="/unitization" component={Unitization} />
    </Container>
  )
}
