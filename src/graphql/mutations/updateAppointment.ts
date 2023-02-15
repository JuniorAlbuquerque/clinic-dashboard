import { gql } from 'graphql-request'

export const UPDATE_APPOINTMENT = gql`
  mutation UpdateAppointment($data: AppointmentUpdateData!) {
    updateAppointment(data: $data) {
      message
    }
  }
`
