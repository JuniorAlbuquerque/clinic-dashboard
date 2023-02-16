/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PatientUpdateInputData } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdatePatient
// ====================================================

export interface UpdatePatient_updatePatient {
  __typename: "PatientReponse";
  message: string;
}

export interface UpdatePatient {
  updatePatient: UpdatePatient_updatePatient;
}

export interface UpdatePatientVariables {
  data: PatientUpdateInputData;
}
