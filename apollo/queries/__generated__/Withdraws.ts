/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { WithDrawStatus } from "./../../__generated__/serverTypes";

// ====================================================
// GraphQL query operation: Withdraws
// ====================================================

export interface Withdraws_withdraws {
  __typename: "Withdraw";
  id: string;
  createdAt: number;
  amount: number;
  status: WithDrawStatus;
  updatedAt: number;
}

export interface Withdraws {
  withdraws: Withdraws_withdraws[];
}
