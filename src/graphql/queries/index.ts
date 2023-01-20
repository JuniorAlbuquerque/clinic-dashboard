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
      start_date
      end_date
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

export const PATIENT_LIST_COUNT = gql`
  query GetPatientCountList {
    getPatientCountList {
      count
      lastPatients {
        id
        name
        birthdate
        telephone
        appointments {
          start_date
          end_date
        }
        patients_packages {
          package {
            name
            treatment {
              name
            }
          }
        }
      }
    }
  }
`
