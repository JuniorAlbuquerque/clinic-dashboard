/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AppointmentStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetAllAppointments
// ====================================================

export interface GetAllAppointments_getAllAppointments_allAppointments {
  __typename: "AppointmentsData";
  id: number;
  start_date: any;
  end_date: any;
  professional: string;
  patient: string;
  presence: AppointmentStatus;
  treatment: string;
  observations: string | null;
}

export interface GetAllAppointments_getAllAppointments {
  __typename: "AllAppointments";
  allAppointments: GetAllAppointments_getAllAppointments_allAppointments[];
  count: number;
}

export interface GetAllAppointments {
  getAllAppointments: GetAllAppointments_getAllAppointments;
}

export interface GetAllAppointmentsVariables {
  itemsPerPage?: number | null;
  page?: number | null;
}
