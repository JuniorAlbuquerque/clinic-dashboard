/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PackageTreatmentList, TreatmentInputData } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateTreatment
// ====================================================

export interface CreateTreatment_createTreatment {
  __typename: "TreatmentModel";
  id: string;
  name: string;
}

export interface CreateTreatment {
  createTreatment: CreateTreatment_createTreatment;
}

export interface CreateTreatmentVariables {
  packages: PackageTreatmentList[];
  data: TreatmentInputData;
}
