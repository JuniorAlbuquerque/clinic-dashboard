/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPatientCountList
// ====================================================

export interface GetPatientCountList_getPatientCountList_lastPatients_appointments {
  __typename: "AppointmentList";
  start_date: any;
  end_date: any;
}

export interface GetPatientCountList_getPatientCountList_lastPatients_patients_packages_package_treatment {
  __typename: "TreatmentItem";
  name: string;
}

export interface GetPatientCountList_getPatientCountList_lastPatients_patients_packages_package {
  __typename: "PackageItem";
  name: string;
  treatment: GetPatientCountList_getPatientCountList_lastPatients_patients_packages_package_treatment;
}

export interface GetPatientCountList_getPatientCountList_lastPatients_patients_packages {
  __typename: "PackageList";
  package: GetPatientCountList_getPatientCountList_lastPatients_patients_packages_package;
}

export interface GetPatientCountList_getPatientCountList_lastPatients {
  __typename: "LastPatientList";
  id: number;
  name: string;
  birthdate: string;
  telephone: string;
  appointments: GetPatientCountList_getPatientCountList_lastPatients_appointments[];
  patients_packages: GetPatientCountList_getPatientCountList_lastPatients_patients_packages[];
}

export interface GetPatientCountList_getPatientCountList {
  __typename: "PatientListCount";
  count: number;
  lastPatients: GetPatientCountList_getPatientCountList_lastPatients[];
}

export interface GetPatientCountList {
  getPatientCountList: GetPatientCountList_getPatientCountList | null;
}
