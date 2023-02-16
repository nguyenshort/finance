/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CheckSigned
// ====================================================

export interface CheckSigned_me_loan {
  __typename: "Loan";
  id: string;
  /**
   * Image chữ ký
   */
  signature: string;
}

export interface CheckSigned_me {
  __typename: "User";
  id: string;
  loan: CheckSigned_me_loan | null;
}

export interface CheckSigned {
  me: CheckSigned_me;
}
