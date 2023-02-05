/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum AppointmentStatus {
  CONCLUDED = "CONCLUDED",
  PATIENT_MISSED = "PATIENT_MISSED",
  PENDING = "PENDING",
}

export enum PaymentStatus {
  BLOCK = "BLOCK",
  PAID = "PAID",
  PENDING = "PENDING",
}

export enum PaymentType {
  CREDIT_CARD = "CREDIT_CARD",
  MONEY = "MONEY",
}

export interface AppointmentDays {
  start_date: any;
  end_date: any;
}

export interface AppointmentInputData {
  package_id: number;
  patient_id: number;
  professional_id: number;
  description: string;
  created_by: number;
}

export interface PackageTreatmentList {
  quantity: number;
  value: number;
}

export interface PatientInputData {
  email: string;
  name: string;
  telephone: string;
  birthdate: string;
  address: string;
  city: string;
  cpf: string;
  weight: number;
  height: number;
  clinic_id: number;
}

export interface PatientPackageInputData {
  appointment: AppointmentInputData;
  schedule: ScheduleInputData;
  payment: PaymentInputData;
}

export interface PaymentInputData {
  discount: number;
  payment_type: PaymentType;
  payment_schedule: boolean;
  payment_date: any;
  payment_status: PaymentStatus;
}

export interface ScheduleInputData {
  initial_date: any;
  appointment_days: AppointmentDays[];
}

export interface TreatmentInputData {
  name: string;
  value: number;
}

export interface UserLoginData {
  email: string;
  password: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
