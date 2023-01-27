/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetWeekAppointments
// ====================================================

export interface GetWeekAppointments_getWeekAppointments_patients_packages_package_treatment {
  __typename: "TreatmentAppointmentModel";
  name: string;
}

export interface GetWeekAppointments_getWeekAppointments_patients_packages_package {
  __typename: "PackageModel";
  treatment: GetWeekAppointments_getWeekAppointments_patients_packages_package_treatment;
}

export interface GetWeekAppointments_getWeekAppointments_patients_packages {
  __typename: "PatientPackageModel";
  package: GetWeekAppointments_getWeekAppointments_patients_packages_package;
}

export interface GetWeekAppointments_getWeekAppointments_patient {
  __typename: "PatientModel";
  name: string;
}

export interface GetWeekAppointments_getWeekAppointments {
  __typename: "AppointmentModel";
  start_date: any;
  end_date: any;
  id: string;
  patients_packages: GetWeekAppointments_getWeekAppointments_patients_packages;
  patient: GetWeekAppointments_getWeekAppointments_patient;
}

export interface GetWeekAppointments {
  getWeekAppointments: GetWeekAppointments_getWeekAppointments[] | null;
}

export interface GetWeekAppointmentsVariables {
  endDate: string;
  initialDate: string;
  userId: number;
}
