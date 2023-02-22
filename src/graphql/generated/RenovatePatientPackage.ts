/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PatientPackageRenovateInputData } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: RenovatePatientPackage
// ====================================================

export interface RenovatePatientPackage_renovatePatientPackage {
  __typename: "PatientPackageCreate";
  message: string;
}

export interface RenovatePatientPackage {
  renovatePatientPackage: RenovatePatientPackage_renovatePatientPackage;
}

export interface RenovatePatientPackageVariables {
  data: PatientPackageRenovateInputData;
}
