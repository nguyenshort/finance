/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetWithdrawsFilter, WithDrawStatus } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL query operation: GetWithdraws
// ====================================================

export interface GetWithdraws_withdraws {
  __typename: "Withdraw";
  id: string;
  createdAt: number;
  /**
   * Số Tiền Vay
   */
  note: string | null;
  /**
   * Trạng thái rut tien
   */
  status: WithDrawStatus;
  /**
   * Số Tiền Vay
   */
  amount: number;
}

export interface GetWithdraws {
  withdraws: GetWithdraws_withdraws[];
}

export interface GetWithdrawsVariables {
  filter: GetWithdrawsFilter;
}
