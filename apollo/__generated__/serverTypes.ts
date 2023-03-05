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

export enum WithDrawStatus {
  APPROVED = "APPROVED",
  PENDING = "PENDING",
  REJECTED = "REJECTED",
}

export interface CreateBankInput {
  account: string;
  bank: string;
  name: string;
}

export interface CreateInfoInput {
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

export interface CreateLoanInput {
  amount: number;
  interest: number;
  months: number;
}

export interface CreateWithdrawInput {
  amount?: number | null;
}

export interface SignInInput {
  email: string;
  password: string;
}

export interface SignLoanInput {
  signature: string;
}

export interface SignUpInput {
  email: string;
  password: string;
}

export interface UpdateIdentityInput {
  avatar: string;
  back: string;
  front: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
