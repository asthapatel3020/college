import { Color } from '@material-ui/lab/Alert'

export interface Feedback {
  message: string
  type: Color
}

export const getErrorFeedback: (message: string) => Feedback = (s: string) => ({ message: s, type: 'error' })

export const getSuccessFeedback: (message: string) => Feedback = (s: string) => ({
  message: s,
  type: 'success'
})
