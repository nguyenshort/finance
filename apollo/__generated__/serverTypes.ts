/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum LOGBOOK_GROUP {
  LOAN = "LOAN",
  WITHDRAW = "WITHDRAW",
}

export enum LOGBOOK_STATUS {
  APPROVED = "APPROVED",
  PENDING = "PENDING",
  REJECTED = "REJECTED",
}

export enum LOGBOOK_TYPE {
  ADD = "ADD",
  SUBTRACT = "SUBTRACT",
}

export enum LoanStatus {
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
  amount: number;
}

export interface GetLogbooksFilter {
  group?: LOGBOOK_GROUP[] | null;
  limit: number;
  offset: number;
  sort: string;
  status?: LOGBOOK_STATUS[] | null;
  type?: LOGBOOK_TYPE[] | null;
}

export interface SignLoanInput {
  signature: string;
}

export interface UpdateIdentityInput {
  avatar: string;
  back: string;
  front: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
