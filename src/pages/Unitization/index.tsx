import React, { FC } from 'react'
import { Route, RouteChildrenProps, Switch } from 'react-router-dom'
import Courses from './Courses'
import { Unit } from './Unit'

type UnitizationProps = RouteChildrenProps

const Unitization: FC<UnitizationProps> = ({ match }) => {
  const url = match?.url
  return (
    <Switch>
      <Route path={`${url}/summary`} render={() => <Unit baseUrl={url || ''} />} />
      <Route path={`${url}`} render={() => <Courses baseUrl={url || ''} />} />
    </Switch>
  )
}

export default Unitization
