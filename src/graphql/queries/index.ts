import { gql } from 'graphql-request'

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

export const ALL_APPOINTMENTS = gql`
  query GetAllAppointments($itemsPerPage: Float, $page: Float) {
    getAllAppointments(items_per_page: $itemsPerPage, page: $page) {
      allAppointments {
        id
        start_date
        end_date
        professional
        patient
        presence
        treatment
        observations
      }
      count
    }
  }
`

export const ALL_TREATMENTS = gql`
  query GetAllTreatments {
    getAllTreatments {
      id
      name
      value
    }
  }
`

export const ALL_PACKAGES_BY_TREATMENT = gql`
  query GetPackagesByTreatment($treatmentId: Float!) {
    getPackagesByTreatment(treatment_id: $treatmentId) {
      id
      name
      quantity
      value
    }
  }
`

export const ALL_PATIENTS = gql`
  query SearchPatients {
    searchPatients {
      id
      name
    }
  }
`

export const ALL_PROFESSIONALS = gql`
  query GetProfessionals {
    getProfessionals {
      id
      name
    }
  }
`

export const PROFESSIONAL_COUNT = gql`
  query GetProfessionalCountList {
    getProfessionalCountList {
      count
      professionalList {
        id
        name
        email
      }
    }
  }
`

export const TREATMENTS_AND_PACKAGES = gql`
  query GetAllTreatmentsWithPackages {
    getAllTreatmentsWithPackages {
      id
      name
      value
      Package {
        id
        name
        quantity
        value
      }
    }
  }
`

export const PATIENT_BY_ID = gql`
  query GetPatientById($patientId: Float!) {
    getPatientById(patient_id: $patientId) {
      id
      name
      email
      cpf
      birthdate
      telephone
      weight
      height
      address
      city
    }
  }
`
