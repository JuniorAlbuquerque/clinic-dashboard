/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPackagesByTreatment
// ====================================================

export interface GetPackagesByTreatment_getPackagesByTreatment {
  __typename?: "PackageByTreatment";
  id: number;
  name: string;
  quantity: number;
  value: number;
}

export interface GetPackagesByTreatment {
  getPackagesByTreatment: GetPackagesByTreatment_getPackagesByTreatment[];
}

export interface GetPackagesByTreatmentVariables {
  treatmentId: number;
}
