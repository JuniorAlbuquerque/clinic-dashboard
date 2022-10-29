import { gql } from '@apollo/client'

export const WEEK_APPOINTMENTS = gql`
  query GetWeekAppointments(
    $endDate: String!
    $initialDate: String!
    $userId: Float!
  ) {
    getWeekAppointments(
      end_date: $endDate
      initial_date: $initialDate
      user_id: $userId
    ) {
      date
      initial_hour
      end_hour
      id
      patients_packages {
        package {
          treatment {
            name
          }
        }
      }
      patient {
        name
      }
    }
  }
`
