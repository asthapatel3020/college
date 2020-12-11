export const tabPanelId = (index: number) => `tabpanel-${index}`
export const tabIndex = (index: number) => `tab-${index}`

export const a11yProps = (index: number) => {
  return {
    id: tabIndex(index),
    'aria-controls': tabPanelId(index)
  }
}
