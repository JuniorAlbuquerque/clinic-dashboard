/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PatientPackageInputData } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreatePatientPackage
// ====================================================

export interface CreatePatientPackage_createPatientPackage {
  __typename: "PatientPackageCreate";
  message: string;
}

export interface CreatePatientPackage {
  createPatientPackage: CreatePatientPackage_createPatientPackage;
}

export interface CreatePatientPackageVariables {
  data: PatientPackageInputData;
}
