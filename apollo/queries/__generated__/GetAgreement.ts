/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LoanStatus } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL query operation: GetAgreement
// ====================================================

export interface GetAgreement_me_info {
  __typename: "Info";
  address: string;
  born: number[];
  cccd: string;
  createdAt: number;
  education: string;
  income: string;
  marriage: string;
  name: string;
  id: string;
  job: string;
  purpose: string;
}

export interface GetAgreement_me_loan {
  __typename: "Loan";
  id: string;
  /**
   * Số Tiền Vay
   */
  amount: number;
  /**
   * Lãi xuất
   */
  interest: number;
  /**
   * Thời Gian Vay
   */
  months: number;
  /**
   * Image chữ ký
   */
  signature: string;
  /**
   * Trạng thái khoản vay
   */
  status: LoanStatus;
}

export interface GetAgreement_me_bank {
  __typename: "Bank";
  id: string;
  bank: string;
  account: string;
  name: string;
}

export interface GetAgreement_me_identity {
  __typename: "Identity";
  id: string;
  front: string;
  back: string;
  avatar: string;
}

export interface GetAgreement_me {
  __typename: "User";
  id: string;
  info: GetAgreement_me_info | null;
  loan: GetAgreement_me_loan | null;
  bank: GetAgreement_me_bank | null;
  identity: GetAgreement_me_identity | null;
  createdAt: number;
}

export interface GetAgreement {
  me: GetAgreement_me;
}
