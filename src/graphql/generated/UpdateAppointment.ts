/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AppointmentUpdateData } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateAppointment
// ====================================================

export interface UpdateAppointment_updateAppointment {
  __typename: "AppointmentResponse";
  message: string;
}

export interface UpdateAppointment {
  updateAppointment: UpdateAppointment_updateAppointment;
}

export interface UpdateAppointmentVariables {
  data: AppointmentUpdateData;
}
