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

export interface AppointmentInputData {
  package_id: number;
  patient_id: number;
  professional_id: number;
  description: string;
  created_by: number;
}

export interface AppointmentUpdateData {
  id: number;
  start_date: any;
  end_date: any;
  observations?: string | null;
  presence?: AppointmentStatus | null;
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

export interface PatientPackageRenovateInputData {
  patient_package_id: number;
  start_date: any;
  hour: string;
  weekDays: WeekDays;
  payment: PaymentInputData;
}

export interface PatientUpdateInputData {
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
  id: number;
}

export interface PaymentInputData {
  discount?: number | null;
  increase?: number | null;
  payment_type: PaymentType;
  payment_schedule: boolean;
  payment_date?: any | null;
  payment_status: PaymentStatus;
}

export interface ScheduleInputData {
  initial_date: any;
  weekDays: WeekDays;
  best_hour: string;
  quantity_month?: number | null;
}

export interface TreatmentInputData {
  name: string;
  value: number;
}

export interface UpdatePackageHistoryPaymentInputData {
  id: number;
  payment_status?: PaymentStatus | null;
  payment_date?: any | null;
  payment_type?: PaymentType | null;
}

export interface UserLoginData {
  email: string;
  password: string;
}

export interface WeekDays {
  seg: boolean;
  ter: boolean;
  qua: boolean;
  qui: boolean;
  sex: boolean;
  sab: boolean;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
