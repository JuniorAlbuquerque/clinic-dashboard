/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllPatientPackageList
// ====================================================

export interface GetAllPatientPackageList_getAllPatientPackageList_data {
  __typename: "PatientPackageListItem";
  id: number;
  patient: string;
  treatment: string;
  package: number;
  professional: string;
  start_date: any;
  end_date: any;
}

export interface GetAllPatientPackageList_getAllPatientPackageList {
  __typename: "PatientPackageList";
  data: GetAllPatientPackageList_getAllPatientPackageList_data[];
  count: number;
}

export interface GetAllPatientPackageList {
  getAllPatientPackageList: GetAllPatientPackageList_getAllPatientPackageList;
}

export interface GetAllPatientPackageListVariables {
  itemsPerPage?: number | null;
  page?: number | null;
}
