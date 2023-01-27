/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AppointmentStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetAllAppointments
// ====================================================

export interface GetAllAppointments_getAllAppointments {
  __typename: "AllAppointments";
  id: number;
  start_date: any;
  end_date: any;
  professional: string;
  patient: string;
  presence: AppointmentStatus;
  treatment: string;
}

export interface GetAllAppointments {
  getAllAppointments: GetAllAppointments_getAllAppointments[];
}
