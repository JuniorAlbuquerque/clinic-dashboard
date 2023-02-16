/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPatientById
// ====================================================

export interface GetPatientById_getPatientById {
  __typename: "PatientById";
  id: number;
  name: string;
  email: string;
  cpf: string | null;
  birthdate: string;
  telephone: string;
  weight: number | null;
  height: number | null;
  address: string | null;
  city: string | null;
}

export interface GetPatientById {
  getPatientById: GetPatientById_getPatientById;
}

export interface GetPatientByIdVariables {
  patientId: number;
}
