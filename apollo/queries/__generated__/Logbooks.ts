/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Logbooks
// ====================================================

export interface Logbooks_logbooks {
  __typename: "Logbook";
  id: string;
  createdAt: number;
  note: string | null;
  amount: number;
}

export interface Logbooks {
  logbooks: Logbooks_logbooks[];
}
