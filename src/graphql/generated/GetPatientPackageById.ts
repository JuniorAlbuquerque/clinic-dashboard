/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PaymentStatus, PaymentType, AppointmentStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetPatientPackageById
// ====================================================

export interface GetPatientPackageById_getPatientPackageById_package_treatment {
  __typename: "PatientPackageById_Treatment";
  name: string;
}

export interface GetPatientPackageById_getPatientPackageById_package {
  __typename: "PatientPackageById_Package";
  quantity: number;
  treatment: GetPatientPackageById_getPatientPackageById_package_treatment;
}

export interface GetPatientPackageById_getPatientPackageById_history {
  __typename: "PatientPackageById_History";
  id: number;
  initial_date: any;
  end_date: any;
  payment_status: PaymentStatus | null;
  payment_type: PaymentType | null;
  payment_date: any | null;
  week_days: string;
}

export interface GetPatientPackageById_getPatientPackageById_appointments {
  __typename: "PatientPackageById_Appointment";
  id: number;
  start_date: any;
  end_date: any;
  presence: AppointmentStatus | null;
  observations: string | null;
}

export interface GetPatientPackageById_getPatientPackageById_patient {
  __typename: "PatientPackageById_Patient";
  id: number;
  name: string;
  email: string;
  cpf: string | null;
  birthdate: string;
  telephone: string;
  height: number | null;
  weight: number | null;
  address: string | null;
  city: string | null;
}

export interface GetPatientPackageById_getPatientPackageById {
  __typename: "PatientPackageById";
  id: number;
  description: string;
  value: number;
  package: GetPatientPackageById_getPatientPackageById_package;
  history: GetPatientPackageById_getPatientPackageById_history[];
  appointments: GetPatientPackageById_getPatientPackageById_appointments[];
  patient: GetPatientPackageById_getPatientPackageById_patient;
}

export interface GetPatientPackageById {
  getPatientPackageById: GetPatientPackageById_getPatientPackageById;
}

export interface GetPatientPackageByIdVariables {
  getPatientPackageByIdId: number;
}
