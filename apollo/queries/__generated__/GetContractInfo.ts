/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetContractInfo
// ====================================================

export interface GetContractInfo_me_info {
  __typename: "Info";
  id: string;
  name: string;
  cccd: string;
}

export interface GetContractInfo_me_loan {
  __typename: "Loan";
  id: string;
  createdAt: number;
  /**
   * Số Tiền Vay
   */
  amount: number;
  /**
   * Lãi xuất
   */
  interest: number;
  /**
   * Image chữ ký
   */
  signature: string;
  /**
   * Thời Gian Vay
   */
  months: number;
}

export interface GetContractInfo_me {
  __typename: "User";
  id: string;
  info: GetContractInfo_me_info | null;
  loan: GetContractInfo_me_loan | null;
}

export interface GetContractInfo {
  me: GetContractInfo_me;
}
