/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllTreatmentsWithPackages
// ====================================================

export interface GetAllTreatmentsWithPackages_getAllTreatmentsWithPackages_Package {
  __typename: "PackageAppointment";
  id: string;
  name: string;
  quantity: number;
  value: number;
}

export interface GetAllTreatmentsWithPackages_getAllTreatmentsWithPackages {
  __typename: "AllTreatmentsAndPackages";
  id: string;
  name: string;
  value: number;
  Package: GetAllTreatmentsWithPackages_getAllTreatmentsWithPackages_Package[];
}

export interface GetAllTreatmentsWithPackages {
  getAllTreatmentsWithPackages: GetAllTreatmentsWithPackages_getAllTreatmentsWithPackages[] | null;
}
