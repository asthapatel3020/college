import React, { FC, ReactNode } from 'react'
import { Box, Typography } from '@material-ui/core'
import { tabPanelId, tabIndex } from '../../../utils/a11y'

interface AccountSettingTabPanelProps {
  children?: ReactNode
  index: number
  value: number
}
export const AccountSettingTabPanel: FC<AccountSettingTabPanelProps> = ({ children, index, value }) => (
  <Typography
    component="div"
    role="tabpanel"
    hidden={value !== index}
    id={tabPanelId(index)}
    aria-labelledby={tabIndex(index)}
  >
    {value === index && <Box p={3}>{children}</Box>}
  </Typography>
)
