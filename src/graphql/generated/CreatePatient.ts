/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PatientInputData } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreatePatient
// ====================================================

export interface CreatePatient_createPatient {
  __typename: "Patient";
  id: string;
  email: string;
}

export interface CreatePatient {
  createPatient: CreatePatient_createPatient;
}

export interface CreatePatientVariables {
  data: PatientInputData;
}
