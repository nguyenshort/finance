/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum LoanStatus {
  APPROVED = "APPROVED",
  PENDING = "PENDING",
  REJECTED = "REJECTED",
}

export interface CreateLoanInput {
  amount: number;
  interest: number;
  months: number;
}

export interface SignLoanInput {
  signature: string;
}

export interface UpdateBankInput {
  account: string;
  bank: string;
  name: string;
}

export interface UpdateIdentityInput {
  avatar: string;
  back: string;
  front: string;
}

export interface UpdateInfoInput {
  address: string;
  born: number[];
  cccd: string;
  education: string;
  income: string;
  job: string;
  marriage: string;
  name: string;
  purpose: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
