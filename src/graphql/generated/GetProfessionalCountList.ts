/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetProfessionalCountList
// ====================================================

export interface GetProfessionalCountList_getProfessionalCountList_professionalList {
  __typename: "ProfessionalList";
  id: number;
  name: string;
  email: string;
}

export interface GetProfessionalCountList_getProfessionalCountList {
  __typename: "ProfessionalCountList";
  count: number;
  professionalList: GetProfessionalCountList_getProfessionalCountList_professionalList[];
}

export interface GetProfessionalCountList {
  getProfessionalCountList: GetProfessionalCountList_getProfessionalCountList | null;
}
