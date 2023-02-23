/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeletePatientPackage
// ====================================================

export interface DeletePatientPackage_deletePatientPackage {
  __typename: "PatientPackageDeleted";
  message: string;
}

export interface DeletePatientPackage {
  deletePatientPackage: DeletePatientPackage_deletePatientPackage;
}

export interface DeletePatientPackageVariables {
  patientPackageId: number;
}
