/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdatePackageHistoryPaymentInputData } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdatePackagePayment
// ====================================================

export interface UpdatePackagePayment_updatePackagePayment {
  __typename: "PatientPackageCreate";
  message: string;
}

export interface UpdatePackagePayment {
  updatePackagePayment: UpdatePackagePayment_updatePackagePayment;
}

export interface UpdatePackagePaymentVariables {
  data: UpdatePackageHistoryPaymentInputData;
}
